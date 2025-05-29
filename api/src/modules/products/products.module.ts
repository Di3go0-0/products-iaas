import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { AxiosModule } from 'src/shared/axios/axios.module';
import { DescriptionsModule } from 'src/shared/descriptions/descriptions.module';
import { LinksModule } from 'src/shared/links/links.module';
import { SaleModule } from 'src/shared/sale/sale.module';

@Module({
  imports: [
    JwtGuardModule,
    AxiosModule,

    DescriptionsModule,
    LinksModule,
    SaleModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
