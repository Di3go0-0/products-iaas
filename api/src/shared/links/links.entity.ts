import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'product_links' })
export class ProductLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'desc_id', type: 'uuid' })
  descId: string;

  @Column({ name: 'sale_id', type: 'uuid' })
  saleId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
