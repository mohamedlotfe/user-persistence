import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @Length(6, 50)
    password: string;
  }