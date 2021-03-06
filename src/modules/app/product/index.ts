import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { ProductController } from './controllers';
import * as UseCases from './useCases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule],
  controllers: [ProductController],
  providers: useCases
})
export class ProductModule {}

export const productChildren: RouteTree = {
  path: '/product',
  module: ProductModule
};
