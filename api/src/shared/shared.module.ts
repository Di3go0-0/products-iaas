import { Module } from '@nestjs/common';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';
import { AxiosModule } from './axios/axios.module';
import { DescriptionsDbModule } from './descriptions-db/descriptions-db.module';
import { SaleDbModule } from './sale-db/sale-db.module';
import { LinksDbModule } from './links-db/links-db.module';
import { LinksModule } from './links/links.module';
import { SaleModule } from './sale/sale.module';
import { DescriptionsModule } from './descriptions/descriptions.module';

@Module({
  imports: [JwtGuardModule, AxiosModule, DescriptionsDbModule, SaleDbModule, LinksDbModule, LinksModule, SaleModule, DescriptionsModule]
})
export class SharedModule { }
