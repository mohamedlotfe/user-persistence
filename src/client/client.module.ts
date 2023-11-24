import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from 'src/entities/Client.entity';
import { Photo } from 'src/entities/Photo.entity';
import { UploaderModule } from 'src/uploader/uploader.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Photo]),
    UploaderModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
