import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class PostProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Laptop ThinkPad X1'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'High performance laptop for developers'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price per unit',
    example: 1299.99
  })
  @IsNumber()
  unitprice: number;

  @ApiProperty({
    description: 'Available quantity in stock',
    example: 10
  })
  @IsNumber()
  stock: number;
}

