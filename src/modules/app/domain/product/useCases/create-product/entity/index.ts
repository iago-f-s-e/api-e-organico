import { ValidateToCreateUnitMeasureProduct } from '@src/modules/app/domain/unit-measure-product/useCases/create-unit-measure-product/entity';
import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { ProductDTO } from '../../../dtos';
import { CreateProductDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateProduct {
  private readonly toCreate: CreateProductDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected typeOrError!: ValidateResponse<ValidateString>;

  constructor(data: ProductDTO) {
    this.set(data);

    this.assert(this.nameOrError, this.typeOrError);

    const name = this.nameOrError.value;
    const type = this.typeOrError.value;
    const unitMeasureProducts = data.unitMeasures.map(
      unitMeasure => new ValidateToCreateUnitMeasureProduct(unitMeasure).value
    );

    this.toCreate = this.afterValidate({ name, type, unitMeasureProducts });
  }

  private set(data: ProductDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.PRODUCT_NAME },
      { errorMessage: errorMessage.name }
    );

    this.typeOrError = ValidateString.exec(
      data.type,
      { isOptional: false, maxSize: maxSize.PRODUCT_TYPE },
      { errorMessage: errorMessage.type }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: ProductDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`,
      type: `The type "${data.type}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateProductDTO {
    return {
      name: validated.name.value.toUpperCase(),
      type: validated.type.value.toUpperCase(),
      unitMeasureProducts: validated.unitMeasureProducts
    };
  }

  public get value(): Readonly<CreateProductDTO> {
    return Object.freeze(this.toCreate);
  }
}