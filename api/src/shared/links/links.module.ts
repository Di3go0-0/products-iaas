import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLink } from './links.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductLink], 'linksConn'),
  ],
  providers: [LinksService],
  exports: [LinksService]
})
export class LinksModule { }
