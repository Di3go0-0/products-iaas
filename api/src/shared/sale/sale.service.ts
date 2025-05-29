import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleType } from '../types/post.product-sale.type';
import { UpdateSaleType } from '../types/patch.product-sale.type';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale, 'saleConn')
    private readonly saleRepo: Repository<Sale>,
  ) { }

  async create(dto: CreateSaleType): Promise<Sale> {
    try {
      const entity = this.saleRepo.create(dto);
      return await this.saleRepo.save(entity);
    } catch (err) {
      throw new InternalServerErrorException('Error creando registro de venta');
    }
  }

  async findAll(): Promise<Sale[]> {
    return this.saleRepo.find();
  }

  async findById(id: string): Promise<Sale> {
    const entity = await this.saleRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Registro de venta no encontrado');
    return entity;
  }

  async update(id: string, dto: UpdateSaleType): Promise<Sale> {
    const entity = await this.findById(id);
    const updated = Object.assign(entity, dto);
    return this.saleRepo.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.saleRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Registro de venta no encontrado');
  }
}
