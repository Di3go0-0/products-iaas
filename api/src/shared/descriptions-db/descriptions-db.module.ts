import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'descConn',
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('MASTER_DB_HOST'),
        port: parseInt(cfg.get<string>('MASTER_DB_PORT') ?? '5432', 10),
        database: 'product_descriptions_db',
        username: cfg.get('DESC_DB_USER'),
        password: cfg.get('DESC_DB_PASS'),
        entities: [__dirname + '/../descriptions/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DescriptionsDbModule { }
