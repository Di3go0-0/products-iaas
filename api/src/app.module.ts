import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';
import { DescriptionsDbModule } from './shared/descriptions-db/descriptions-db.module';
import { SaleDbModule } from './shared/sale-db/sale-db.module';
import { LinksDbModule } from './shared/links-db/links-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    ModulesModule, SharedModule,

    DescriptionsDbModule,
    SaleDbModule,
    LinksDbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
