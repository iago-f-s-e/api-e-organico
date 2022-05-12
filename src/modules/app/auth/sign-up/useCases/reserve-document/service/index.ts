import { ConflictException, Injectable } from '@nestjs/common';
import { FindUserRepository } from '@src/modules/app/user/useCases/find-user/repository';
import { Either, left, right } from '@src/modules/common/either';
import { CacheService } from '@src/modules/common/services';
import { ReserveDocumentDTO } from '../dtos';

type Response = Promise<Either<ConflictException, null>>;

@Injectable()
export class ReserveDocumentService {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly cacheService: CacheService
  ) {}

  public async exec(data: ReserveDocumentDTO, key: string): Response {
    const phoneExists = await this.findUser.byDocument(data.document);

    if (phoneExists) return left(new ConflictException('The user document already exists.'));

    // TODO: usar observabilidade para tratar erro
    this.cacheService.set(key, data).catch(err => console.error(err));

    return right(null);
  }
}