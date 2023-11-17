
import { Controller, Post, Body } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/Client';

@Controller('api')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('register')
  async registerClient(@Body() clientDto: ClientDto): Promise<void> {
    await this.clientService.registerClient(clientDto);
  }
}