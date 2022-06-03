import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Product) private readonly market: Repository<Product>) {}

  public async findAll(): Promise<Product[]> {
    return this.market.find({
      where: { isActive: true },
      order: {
        name: 'ASC',
        type: 'ASC'
      },
      select: {
        id: true,
        name: true,
        type: true
      }
    });
  }
}
