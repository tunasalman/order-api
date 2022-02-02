import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { CustomerOrder } from './entities/customer-order.entity';

@Injectable()
export class CustomerOrdersService {
  private readonly logger = new Logger(CustomerOrdersService.name);
  constructor(
    @InjectRepository(CustomerOrder)
    private customerOrderRepo: Repository<CustomerOrder>,
  ) {}

  async create(customer: Customer, products: Product[]) {
    const order = await this.customerOrderRepo.save({
      customer,
      products,
    });
    return order;
  }

  async findAll() {
    return await this.customerOrderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.customerOrderRepo.findOne({ where: [{ id }] });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async remove(id: number) {
    await this.customerOrderRepo.delete(id);
  }

  async addProduct(id: number, product: Product) {
    const order = await this.findOne(id);
    order.products.push(product);
    await this.customerOrderRepo.save(order);
    return order;
  }
}
