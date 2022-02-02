import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateProductDto } from '../../products/dto/create-product.dto';
import { CreateCustomerDto } from './create-customer.dto';

export class CreateCustomerOrderDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @ApiProperty({ type: [CreateProductDto] })
  @ValidateNested()
  @Type(() => CreateProductDto)
  products: [CreateProductDto];
}
