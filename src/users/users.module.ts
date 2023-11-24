import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { BullModule } from '@nestjs/bull';
import { UsersProcessor } from './users.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'users_queue',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersProcessor],
})
export class UsersModule {}
