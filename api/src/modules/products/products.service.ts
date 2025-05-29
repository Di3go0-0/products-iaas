import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DescriptionsService } from 'src/shared/descriptions/descriptions.service';
import { LinksService } from 'src/shared/links/links.service';
import { SaleService } from 'src/shared/sale/sale.service';
import { PostProductType } from './type/post.products.type';
import { PatchProductType } from './type/patch.products.type';

@Injectable()
export class ProductsService {
  constructor(
    private readonly descService: DescriptionsService,
    private readonly saleService: SaleService,
    private readonly linksService: LinksService,
  ) { }

  async create(post: PostProductType) {
    const ids: { descId?: string; saleId?: string; linkId?: string } = {};
    try {
      const desc = await this.descService.create({ name: post.name, description: post.description });
      ids.descId = desc.id;

      const sale = await this.saleService.create({ unitprice: post.unitprice, stock: post.stock });
      ids.saleId = sale.id;

      const link = await this.linksService.create({ descId: ids.descId, saleId: ids.saleId });
      ids.linkId = link.id;

      return {
        id: ids.linkId,
        name: post.name,
        description: post.description,
        unitprice: post.unitprice,
        stock: post.stock,
      };
    } catch (error) {
      if (ids.linkId) await this.linksService.delete(ids.linkId);
      if (ids.saleId) await this.saleService.delete(ids.saleId);
      if (ids.descId) await this.descService.delete(ids.descId);
      throw new InternalServerErrorException('Error creando producto completo');
    }
  }

  async findAll() {
    const descs = await this.descService.findAll();
    return Promise.all(
      descs.map(async desc => {
        const link = await this.linksService.findByDescId(desc.id);
        const sale = await this.saleService.findById(link.saleId);
        return {
          id: link.id,
          name: desc.name,
          description: desc.description,
          unitprice: sale.unitprice,
          stock: sale.stock,
        };
      }),
    );
  }

  async findOne(id: string) {
    let link;
    try { link = await this.linksService.findBySaleId(id); } catch { }
    if (!link) {
      link = await this.linksService.findByDescId(id);
    }
    if (!link) throw new NotFoundException('Producto no encontrado');

    const desc = await this.descService.findById(link.descId);
    const sale = await this.saleService.findById(link.saleId);
    return {
      id: link.id,
      name: desc.name,
      description: desc.description,
      unitprice: sale.unitprice,
      stock: sale.stock,
    };
  }

  async update(id: string, patch: PatchProductType) {
    let link;
    try { link = await this.linksService.findBySaleId(id); } catch { }
    if (!link) {
      link = await this.linksService.findByDescId(id);
    }
    if (!link) throw new NotFoundException('Producto no encontrado para actualización');

    let updatedDesc, updatedSale;
    if (patch.name !== undefined || patch.description !== undefined) {
      updatedDesc = await this.descService.update(link.descId, {
        name: patch.name,
        description: patch.description,
      });
    }
    if (patch.unitprice !== undefined || patch.stock !== undefined) {
      updatedSale = await this.saleService.update(link.saleId, {
        unitprice: patch.unitprice,
        stock: patch.stock,
      });
    }

    const finalDesc = updatedDesc ?? await this.descService.findById(link.descId);
    const finalSale = updatedSale ?? await this.saleService.findById(link.saleId);
    return {
      id: link.id,
      name: finalDesc.name,
      description: finalDesc.description,
      unitprice: finalSale.unitprice,
      stock: finalSale.stock,
    };
  }

  async remove(id: string) {
    let link;
    try { link = await this.linksService.findBySaleId(id); } catch { }
    if (!link) {
      link = await this.linksService.findByDescId(id);
    }
    if (!link) throw new NotFoundException('Producto no encontrado para eliminación');

    await this.linksService.delete(link.id);
    await this.saleService.delete(link.saleId);
    await this.descService.delete(link.descId);
    return { deleted: true };
  }
}
