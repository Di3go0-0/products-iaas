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
        host: cfg.get<string>('MASTER_DB_HOST'),
        port: parseInt(cfg.get<string>('MASTER_DB_PORT') ?? '5432', 10),
        username: cfg.get('SALE_DB_USER'),
        password: cfg.get('SALE_DB_PASS'),
        database: 'product_sales_db',
        entities: [__dirname + '/../sale/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class SaleDbModule { }
