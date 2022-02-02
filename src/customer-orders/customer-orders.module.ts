import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsModule } from 'src/products/products.module';
import { Customer } from '../customers/entities/customer.entity';
import { CustomerOrdersController } from './customer-orders.controller';
import { CustomerOrdersService } from './customer-orders.service';
import { CustomerOrder } from './entities/customer-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerOrder, Customer]),
    ProductsModule,
    CustomersModule,
  ],
  controllers: [CustomerOrdersController],
  providers: [CustomerOrdersService],
})
export class CustomerOrdersModule {}
