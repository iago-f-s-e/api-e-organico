import { AddressDTO } from '@src/modules/app/address/dtos';
import { CertificationType } from '@src/types/entities';
import { ProducerMarketDTO } from '../producer-market';
import { ProducerProductDTO } from '../producer-product/producer-product.dto';

export type ProducerPropDTO = {
  makeDelivery: boolean;
  certificationType: CertificationType;
};

export type ProducerDTO = {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  address: AddressDTO;
  producer: ProducerPropDTO;
  markets: ProducerMarketDTO[];
  products: ProducerProductDTO[];
};
