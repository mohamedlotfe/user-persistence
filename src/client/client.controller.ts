import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto, ClientRegisterDto } from './dto/Client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IFile } from '../uploader/File.interface';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/LoginDto';

@Controller('api')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UseInterceptors(FilesInterceptor('photos', 4))
  async registerClient(
    @UploadedFiles() photos: Array<IFile>,
    @Body() input: ClientRegisterDto,
  ): Promise<ClientDto> {
    return await this.clientService.register(input, photos);
  }

  @Post('login')
  async login(@Body() input: LoginDto): Promise<{ token: string }> {
    const token = await this.authService.login(input);
    return { token };
  }
}
