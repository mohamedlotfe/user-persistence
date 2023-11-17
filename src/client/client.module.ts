import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from 'src/entities/Client.entity';
import { Photo } from 'src/entities/Photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Photo])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
