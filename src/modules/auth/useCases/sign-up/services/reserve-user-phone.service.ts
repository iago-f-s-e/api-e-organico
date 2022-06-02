import { ConflictException, Injectable } from '@nestjs/common';
import { RedisService } from '@src/infra/redis/services';
import { FindUserRepository } from '@src/modules/app/user/useCases/find-user/repository';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types';
import { ReservePhoneDTO } from '../dtos';

@Injectable()
export class ReserveUserPhone {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly cacheService: RedisService
  ) {}

  private errorMessage(): string {
    return 'The user phone already exists.';
  }

  public async exec(data: ReservePhoneDTO, key: string): CreateResponse<null> {
    const documentExistis = await this.findUser.existingByDocument(data.phone);

    if (documentExistis) return left(new ConflictException(this.errorMessage()));

    this.cacheService.set(key, data).catch(err => console.error(err));

    return right(null);
  }
}
