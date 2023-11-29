import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/LoginDto';
import { User } from 'src/entities/User.entity';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly clientService: ClientService,
  ) {}

  generateToken(user: User): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;

    const client = await this.clientService.getByEmailAndPass(
      email,
      password,
    );

    if (!client) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { clientId: client.id, email };
    const secretKey = process.env.JWT_SECRET ?? 'your-secret-key';

    const token = this.jwtService.sign(payload, { secret: secretKey });
    return token;
  }
}
