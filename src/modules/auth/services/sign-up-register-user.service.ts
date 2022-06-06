import { Injectable } from '@nestjs/common';
import { LoggedUserDTO } from '@src/domain/dtos/auth';
import { CreateUserDTO } from '@src/domain/dtos/user';
import { userToClient } from '@src/domain/toClient';
import { CreateUserUserCase } from '@src/modules/user/useCases';
import { left, right } from '@src/modules/common/either';
import { TokenService } from '@src/modules/common/services';
import { CreateResponse } from '@src/modules/common/types/responses';

@Injectable()
export class SignUpRegisterUserService {
  constructor(
    private readonly createUserUseCase: CreateUserUserCase,
    private readonly tokenService: TokenService
  ) {}

  public async exec(data: CreateUserDTO): CreateResponse<LoggedUserDTO> {
    const createOrError = await this.createUserUseCase.exec(data);

    if (createOrError.isLeft()) return left(createOrError.value);

    const user = userToClient(createOrError.value);
    const token = this.tokenService.generate({ id: user.id });

    return right({ token, user });
  }
}
