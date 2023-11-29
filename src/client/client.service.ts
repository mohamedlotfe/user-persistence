import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/Client.entity';
import { Photo } from 'src/entities/Photo.entity';
import { Repository } from 'typeorm';
import { ClientDto, ClientRegisterDto } from './dto/Client';
import { IFile } from '../uploader/File.interface';
import { UploaderService } from 'src/uploader/uploader.service';
import { ClientMapper } from './dto/ClientMapper';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly uploaderService: UploaderService,
  ) {}

  async register(
    clientDto: ClientRegisterDto,
    photos: IFile[],
  ): Promise<ClientDto> {
    try {
      const { firstName, lastName, email, password } = clientDto;

      if (await this.getByEmail(email)) {
        throw new BadRequestException('Email already  in use for other client');
      }
      
      const client = new Client();
      client.firstName = firstName;
      client.lastName = lastName;
      client.email = email;
      client.password = password;
      client.fullName = `${firstName} ${lastName}`;

      // The default avatar image
      client.avatar = 'https://example.com/default-avatar.jpg';

      const photoEntities = await Promise.all(
        photos.map(async (photo: IFile) => {
          const photoUrl = await this.uploaderService.upload(photo);

          const photoEntity = new Photo();
          photoEntity.url = photoUrl;
          photoEntity.client = client;
          photoEntity.name = photo.originalname?.trim() ?? 'default.png';
          return photoEntity;
        }),
      );

      client.photos = photoEntities || [];

      await this.clientRepository.save(client);

      return ClientMapper.toDto(client);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  async getByEmailAndPass(email: string, password: string): Promise<Client> {
    return this.clientRepository.findOne({ email, password });
  }

  async getById(id: number): Promise<ClientDto> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return ClientMapper.toDto(client);
  }

  async getByEmail(email: string): Promise<Client> {
    return this.clientRepository.findOne({ email });
  }
}
