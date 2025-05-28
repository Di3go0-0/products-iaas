import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardGuard } from 'src/shared/jwt-guard/jwt-guard.guard';


@ApiTags('Products')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardGuard)
@Controller('products')
export class ProductsController {
  @Get()
  async get() {
    return 'hello :)'
  }
}
