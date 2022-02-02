import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(25)
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  address?: string;
}
