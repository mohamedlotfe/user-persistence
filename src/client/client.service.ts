import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/Client.entity';
import { Photo } from 'src/entities/Photo.entity';
import { Repository } from 'typeorm';
import { ClientDto } from './dto/Client';
import { S3Uploader } from 'src/utils/s3-uploading';
import { generateFileName } from 'src/utils/helpers';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async registerClient(clientDto: ClientDto): Promise<void> {
    const { firstName, lastName, photos } = clientDto;

    const client = new Client();
    client.firstName = firstName;
    client.lastName = lastName;
    client.fullName = `${firstName} ${lastName}`;
    // The default avatar image
    client.avatar = 'https://example.com/default-avatar.jpg';

    const uploader = new S3Uploader();
    const photoEntities = await Promise.all(
      photos.map(async (photo) => {
        const fileBuffer = await uploader.convertToBuffer(photo);
        const fileName = generateFileName();

        const photoUrl = await uploader.uploadPhoto(fileBuffer, fileName);

        const photoEntity = new Photo();
        photoEntity.url = photoUrl;
        photoEntity.client = client;
        return photoEntity;
      }),
    );

    client.photos = photoEntities;

    await this.clientRepository.save(client);
  }
  async getClientByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<Client | undefined> {
    return this.clientRepository.findOne({ email, password });
  }
}
