import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { ClientService } from 'src/client/client.service';
import { ClientDto } from 'src/client/dto/Client';

@Controller('users')
export class UserController {
  constructor(private readonly clientService: ClientService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() request): Promise<ClientDto> {
    return this.clientService.getById(request.user.id);
  }
}
