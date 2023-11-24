import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectQueue('users_queue') private readonly usersQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(userId: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async findOneByIdWithCach(userId: number): Promise<User | null> {
    const user: User = await this.cacheManager.get(`${userId}`);
    console.log('user ', user);
    if (!user) {
      const userFromRepository: User = await this.findOneById(userId);
      if (userFromRepository) {
        this.cacheManager.set(`${userId}`, userFromRepository);
        console.log('return from db');
        return userFromRepository;
      } else {
        return null;
      }
    } else {
      console.log('return from redis');
      return user;
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async isEmailExists(email: string): Promise<boolean> {
    const user: User | null = await this.usersRepository.findOneBy({ email });
    return !!user;
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    const hashPassword: string = await bcrypt.hash(payload.password, 5);
    payload.password = hashPassword;
    const newUserEntity: User = this.usersRepository.create({
      ...payload,
    });

    await this.usersRepository.save(newUserEntity);

    this.usersQueue.add('user_created', newUserEntity, { delay: 10000 });

    return newUserEntity;
  }
}
