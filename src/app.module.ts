import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Client } from './entities/Client.entity';
import { Photo } from './entities/Photo.entity';

import { ConfigModule } from '@nestjs/config';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { ClientModule } from './client/client.module';
import { UploaderModule } from './uploader/uploader.module';
import { APP_FILTER } from '@nestjs/core';
import { TypeORMQueryExceptionFilter } from './utils/error-hnadling';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // PostgreSQL database connection
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Client, Photo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Client, Photo]),
    AuthModule,
    UploaderModule,
    UserModule,
    ClientModule,
  ],
  controllers: [AppController, UserController, ClientController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeORMQueryExceptionFilter,
    },
    AppService,
    UserService,
    ClientService,
    
  ],
})
export class AppModule {}
