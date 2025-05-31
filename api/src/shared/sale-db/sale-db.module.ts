import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'saleConn',
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: '10.101.90.83',
        port: 5432,
        database: 'product_sales_db',
        username: cfg.get('SALE_DB_USER'),
        password: cfg.get('SALE_DB_PASS'),
        entities: [__dirname + '/../sale/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class SaleDbModule {}
