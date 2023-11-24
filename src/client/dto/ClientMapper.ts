import { User } from "src/entities/User.entity";
import { ClientDto } from "./Client";
import { Client } from "src/entities/Client.entity";
import { Photo } from "src/entities/Photo.entity";

export class ClientMapper {
    static toDto(client: Client): ClientDto {
      const clientDto = new ClientDto();
      clientDto.id = client.id;
      clientDto.firstName = client.firstName;
      clientDto.lastName = client.lastName;
      clientDto.email = client.email;
      clientDto.fullName = client.fullName;
      clientDto.photos = client.photos?.map(({ url, name }) => ({ url, name }) as Photo);
  
      return clientDto;
    }
  }