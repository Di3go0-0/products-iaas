import { Module } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDescription } from './descriptions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductDescription], 'descConn'),
  ],
  providers: [DescriptionsService],
  exports: [DescriptionsService]
})
export class DescriptionsModule { }
