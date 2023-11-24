import {
  IsBoolean,
  IsEmail,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { Client } from './Client.entity';
import { Photo } from './Photo.entity';

@Entity('users', { schema: 'public' })
export class User extends BaseEntity {
  @Column({ length: 25 })
  @Length(2, 25)
  firstName: string;

  @Column({ length: 25 })
  @Length(2, 25)
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  @Length(6, 50)
  password?: string;

  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
