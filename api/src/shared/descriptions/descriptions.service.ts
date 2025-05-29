import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDescription } from './descriptions.entity';
import { Repository } from 'typeorm';
import { CreateProductDescriptionType } from '../types/post.product-description.type';
import { UpdateProductDescriptionType } from '../types/patch.product-description.type';

@Injectable()
export class DescriptionsService {
  constructor(
    @InjectRepository(ProductDescription, 'descConn')
    private readonly descRepo: Repository<ProductDescription>,
  ) { }

  async create(dto: CreateProductDescriptionType): Promise<ProductDescription> {
    try {
      const entity = this.descRepo.create(dto);
      return await this.descRepo.save(entity);
    } catch (err) {
      throw new InternalServerErrorException('Error creando descripción de producto');
    }
  }

  async findAll(): Promise<ProductDescription[]> {
    return this.descRepo.find();
  }

  async findById(id: string): Promise<ProductDescription> {
    const entity = await this.descRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Descripción no encontrada');
    return entity;
  }

  async update(id: string, dto: UpdateProductDescriptionType): Promise<ProductDescription> {
    const entity = await this.findById(id);
    const updated = Object.assign(entity, dto);
    return this.descRepo.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.descRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Descripción no encontrada');
  }

}
