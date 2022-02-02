import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  quantity!: number;
}
