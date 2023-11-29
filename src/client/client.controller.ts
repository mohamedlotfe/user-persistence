import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto, ClientRegisterDto } from './dto/Client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IFile } from '../uploader/File.interface';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/LoginDto';
import { ApiFiles } from 'src/uploader/api-files.decorator';
import { parse } from 'path';
import { ParseFile } from 'src/uploader/parse-file.pipe';

@Controller('api')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiFiles('photos')
  async registerClient(
    @UploadedFiles(new ParseFile(4)) photos: Array<IFile>,
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

// @UploadedFiles(
//   new ParseFilePipe({
//     validators: [
//       new MaxFileSizeValidator({ maxSize: 1000 }),
//       new FileTypeValidator({ fileType: 'image/png' }),
//     ],
//   }),
// )
