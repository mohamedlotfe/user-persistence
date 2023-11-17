import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/UserDto';
import { UserMapper } from './dtos/UserMapper';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { CreateUserDto } from './dtos/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    return UserMapper.toDto(user);
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne( {where: { email }});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { firstName, lastName, email, password } = createUserDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    await this.userRepository.save(user);
    return UserMapper.toDto(user);
  }



  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const { firstName, lastName, email } = updateUserDto;

    const user = await this.getById(id);
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    const updated =await this.userRepository.save(user);
    return UserMapper.toDto(updated);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
