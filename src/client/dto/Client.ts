import { IsNotEmpty, IsArray, ArrayMinSize, IsEmail, IsStrongPassword } from 'class-validator';
import { Photo } from 'src/entities/Photo.entity';

export class ClientDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  photos: Photo[];
}

export class ClientRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
