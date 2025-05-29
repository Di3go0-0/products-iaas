import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DescriptionsDbModule } from '../descriptions-db/descriptions-db.module';
import { SaleDbModule } from '../sale-db/sale-db.module';
import { LinksDbModule } from '../links-db/links-db.module';

@Module({
  imports: [
    ConfigModule,
    DescriptionsDbModule,
    SaleDbModule,
    LinksDbModule,
  ],
  exports: [
    DescriptionsDbModule,
    SaleDbModule,
    LinksDbModule,
  ],
})
export class DatabaseModule { }

