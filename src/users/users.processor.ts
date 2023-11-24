import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Processor('users_queue')
export class UsersProcessor {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  private readonly logger = new Logger(UsersProcessor.name);

  @Process('user_created')
  async handleCreatedUser(job: Job): Promise<void> {
    this.usersRepository.update(job.data.id, { status: true });

    //check if we should update redis cache
    const user: User | null = await this.cacheManager.get(`${job.data.id}`);
    if (user) {
      this.cacheManager.set(`${job.data.id}`, { ...user, status: true });
    }
  }
}
