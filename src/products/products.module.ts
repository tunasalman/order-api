import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/elastic-search/search.module';
import { Product } from './entities/product.entity';
import ProductSearchService from './product-search.service';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SearchModule],
  providers: [ProductsService, ProductSearchService],
  exports: [ProductsService],
})
export class ProductsModule {}
