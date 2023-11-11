import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './configuration/db/db.module';
import { MoviesModule } from './movies/movies.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DbModule,
    UsersModule,
    AuthModule,
    MoviesModule,
    ProducerModule,
  ],
})
export class AppModule {}
