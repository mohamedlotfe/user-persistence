import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsArray()
  @ArrayMinSize(4)
  photos: string[];
}