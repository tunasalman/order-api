import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import ProductSearchService from './product-search.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private productSearchService: ProductSearchService,
  ) {}

  async findAll(options?: FindOneOptions<Product>) {
    const products = await this.productRepo.find(options);
    return products;
  }

  async search(text: string, orderId: number) {
    const results = await this.productSearchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    const products = await this.findAll({
      where: [{ id: In(ids), order: { id: orderId } }],
    });
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: [{ id }] });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(product: CreateProductDto) {
    const savedProduct = await this.productRepo.save(product);
    await this.productSearchService.indexProduct(savedProduct);
    return savedProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    const updatedProduct = await this.findOne(id);
    await this.productSearchService.update(updatedProduct);
    return updatedProduct;
  }

  async remove(id: number) {
    await this.productRepo.delete(id);
    await this.productSearchService.remove(id);
  }
}
