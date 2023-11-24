import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bull';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis-stack',
        port: 6379,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      // @ts-ignore
      store: async () =>
        await redisStore({
          // Store-specific configuration:
          socket: {
            host: 'redis-stack',
            port: 6379,
          },
          ttl: 60 * 30,
        }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
