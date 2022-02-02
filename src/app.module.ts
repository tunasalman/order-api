import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import DatabaseLogger from './common/loggers/typeorm.logger';
import LogsMiddleware from './common/middleware/logs.middleware';
import { MyValidationPipe } from './common/pipes/validation.pipe';
import { CustomerOrdersModule } from './customer-orders/customer-orders.module';
import { CustomerOrder } from './customer-orders/entities/customer-order.entity';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { SearchModule } from './elastic-search/search.module';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
          synchronize: true,
          logger: new DatabaseLogger(),
          entities: [Customer, Product, CustomerOrder],
        };
      },
    }),
    SearchModule,
    CustomerOrdersModule,
    ProductsModule,
    CustomersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: MyValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
