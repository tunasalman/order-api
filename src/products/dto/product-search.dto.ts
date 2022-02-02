import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProductSearchDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  searchParam?: string;
}
