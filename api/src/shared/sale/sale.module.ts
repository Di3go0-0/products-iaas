import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale], 'saleConn'),
  ],
  providers: [SaleService],
  exports: [SaleService]
})
export class SaleModule { }
