import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponse<T> {
  constructor(status = HttpStatus.OK, success = true, data?: T | T[]) {
    this.status = status;
    this.success = success;
    this.data = data;
  }

  @ApiProperty({
    example: 200,
    description: 'Status code returned',
    required: false,
  })
  status!: number;

  @ApiProperty()
  success!: boolean;

  @ApiProperty({
    required: false,
  })
  data?: T | T[];
}
