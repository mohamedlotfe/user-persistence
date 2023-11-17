import { IsEmail, Length } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
  
    @Length(6, 50)
    password: string;
  }