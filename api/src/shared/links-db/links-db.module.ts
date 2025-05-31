import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'linksConn',
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: 'db1.incus',
        port: 5432,
        database: 'links_db',
        username: cfg.get('LINKS_DB_USER'),
        password: cfg.get('LINKS_DB_PASS'),
        entities: [__dirname + '/../links/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class LinksDbModule {}
