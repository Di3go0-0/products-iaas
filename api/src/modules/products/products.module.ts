import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtGuardModule } from 'src/shared/jwt-guard/jwt-guard.module';
import { AxiosModule } from 'src/shared/axios/axios.module';

@Module({
  imports: [JwtGuardModule, AxiosModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
