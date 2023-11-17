import { User } from "src/entities/User.entity";
import { UserDto } from "./UserDto";

export class UserMapper {
    static toDto(user: User): UserDto {
      const userDto = new UserDto();
      userDto.id = user.id;
      userDto.firstName = user.firstName;
      userDto.lastName = user.lastName;
      userDto.email = user.email;
      userDto.active = user.active;
      userDto.createdAt = user.createdAt;
      userDto.updatedAt = user.updatedAt;
      return userDto;
    }
  }