import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '@src/domain/dtos/user';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  public insert(data: CreateUserDTO): Promise<User> {
    return this.user.save(this.user.create(data));
  }

  public findByEmail(email: string): Promise<User[]> {
    return this.user.find({
      where: { email },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        password: true,
        address: {
          id: true,
          city: true,
          complement: true,
          district: true,
          number: true,
          state: true,
          street: true,
          zipCode: true
        },
        producer: {
          makeDelivery: true
        }
      },
      relations: {
        address: true,
        producer: true
      }
    });
  }

  public existingByDocument(document: string): Promise<User | null> {
    return this.user.findOne({
      where: { document },
      select: {
        id: true
      }
    });
  }

  public existingByEmail(email: string): Promise<User | null> {
    return this.user.findOne({
      where: { email },
      select: {
        id: true
      }
    });
  }

  public existingByPhone(phone: string): Promise<User | null> {
    return this.user.findOne({
      where: { phone },
      select: {
        id: true
      }
    });
  }
}
