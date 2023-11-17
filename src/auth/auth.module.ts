import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [AuthController],
  providers: [JwtService, AuthService],
  exports: [AuthService], // Include other services if needed
})
export class AuthModule {}