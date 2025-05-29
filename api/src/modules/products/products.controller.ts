import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardGuard } from 'src/shared/jwt-guard/jwt-guard.guard';
import { ProductsService } from './products.service';
import { PostProductDto } from './dto/post.products.type';
import { PatchProductDto } from './dto/patch.products.type';


@ApiTags('Products')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() post: PostProductDto) {
    return this.productService.create(post);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() patch: PatchProductDto,
  ) {
    return this.productService.update(id, patch);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
  }
}
