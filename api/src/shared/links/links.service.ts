import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductLink } from './links.entity';
import { CreateLinkType } from '../types/post.product-links.type';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(ProductLink, 'linksConn')
    private readonly linkRepo: Repository<ProductLink>,
  ) { }

  async create(dto: CreateLinkType): Promise<ProductLink> {
    try {
      const entity = this.linkRepo.create(dto);
      return await this.linkRepo.save(entity);
    } catch (err) {
      throw new InternalServerErrorException('Error creando enlace de producto');
    }
  }

  async findByDescId(descId: string): Promise<ProductLink> {
    const link = await this.linkRepo.findOne({ where: { descId } });
    if (!link) throw new NotFoundException('Enlace no encontrado para descripción');
    return link;
  }

  async findBySaleId(saleId: string): Promise<ProductLink> {
    const link = await this.linkRepo.findOne({ where: { id: saleId } });
    if (!link) throw new NotFoundException('Enlace no encontrado para venta');
    return link;
  }

  async delete(id: string): Promise<void> {
    const result = await this.linkRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Enlace no encontrado');
  }

}
