import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { InfraModule } from '@src/infra';

import * as Controllers from './controllers';
import * as UseCases from './useCases';

const controllers = Object.values(Controllers);
const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule],
  controllers,
  providers: useCases
})
export class TransactionModule {}

export const transactionChildren: RouteTree = {
  path: '/transaction',
  module: TransactionModule
};