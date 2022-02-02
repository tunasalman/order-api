import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  barcode!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  description!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  price!: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  quantity!: number;
}
