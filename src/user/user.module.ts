import { Module, forwardRef } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ClientModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
