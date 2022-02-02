import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IDParam } from 'src/common/decorators/id.decorator';
import { DefaultResponse } from 'src/common/responses/default.response';
import { CustomersService } from 'src/customers/customers.service';
import { ProductSearchDto } from 'src/products/dto/product-search.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { CustomerOrdersService } from './customer-orders.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('customer-orders')
@Controller('customer-orders')
export class CustomerOrdersController {
  constructor(
    private readonly customerOrdersService: CustomerOrdersService,
    private readonly productsService: ProductsService,
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create order',
    type: DefaultResponse,
  })
  async create(@Body() { customer, products }: CreateCustomerOrderDto) {
    const savedCustomer = await this.customersService.create(customer);
    const savedProducts: Product[] = [];
    for (const product of products) {
      const savedProduct = await this.productsService.create(product);
      savedProducts.push(savedProduct);
    }
    const order = await this.customerOrdersService.create(
      savedCustomer,
      savedProducts,
    );
    return new DefaultResponse(HttpStatus.CREATED, true, order);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get orders',
    type: DefaultResponse,
  })
  async findAll() {
    const orders = await this.customerOrdersService.findAll();
    return new DefaultResponse(HttpStatus.OK, true, orders);
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get order by given id',
    type: DefaultResponse,
  })
  async findOne(@IDParam('orderId') orderId: number) {
    const order = await this.customerOrdersService.findOne(orderId);
    return new DefaultResponse(HttpStatus.OK, true, order);
  }

  @Delete(':orderId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete order by given id',
    type: DefaultResponse,
  })
  async remove(@IDParam('orderId') orderId: number) {
    await this.customerOrdersService.remove(orderId);
    return new DefaultResponse();
  }

  @Patch(':orderId/customer')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update customer by given orderId',
    type: DefaultResponse,
  })
  async updateCustomer(
    @IDParam('orderId') orderId: number,
    @Body() updateCustomerOrderDto: UpdateCustomerDto,
  ) {
    const order = await this.customerOrdersService.findOne(orderId);
    const customerId = order.customer.id;
    const updatedCustomer = await this.customersService.update(
      customerId,
      updateCustomerOrderDto,
    );
    return new DefaultResponse(HttpStatus.OK, true, updatedCustomer);
  }

  @Get(':orderId/products')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search products',
    type: DefaultResponse,
  })
  async findAllProduct(
    @IDParam('orderId') orderId: number,
    @Query() { searchParam }: ProductSearchDto,
  ) {
    let products: Product[];
    if (searchParam) {
      products = await this.productsService.search(searchParam, orderId);
      return new DefaultResponse(HttpStatus.OK, true, products);
    }
    products = await this.productsService.findAll({
      where: [{ order: { id: orderId } }],
    });
    return new DefaultResponse(HttpStatus.OK, true, products);
  }

  @Post(':orderId/products')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add a product to order',
    type: DefaultResponse,
  })
  async addProduct(
    @IDParam('orderId') orderId: number,
    @Body() product: CreateProductDto,
  ) {
    const savedProduct = await this.productsService.create(product);
    const order = await this.customerOrdersService.addProduct(
      orderId,
      savedProduct,
    );
    return new DefaultResponse(HttpStatus.OK, true, order);
  }

  @Patch(':orderId/products/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update product by given productId',
    type: DefaultResponse,
  })
  async updateProduct(
    @IDParam('productId') productId: number,
    @Body() updateCustomerOrderDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.update(
      productId,
      updateCustomerOrderDto,
    );
    return new DefaultResponse(HttpStatus.OK, true, updatedProduct);
  }

  @Delete(':orderId/products/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete product by given productId',
    type: DefaultResponse,
  })
  async deleteProduct(@IDParam('productId') productId: number) {
    await this.productsService.remove(productId);
    return new DefaultResponse();
  }
}
