import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './Base.entity';
import { User } from './User.entity';
import { Photo } from './Photo.entity';
import { IsUrl } from 'class-validator';

@Entity()
export class Client extends User {
  @Column()
  @IsUrl()
  avatar: string;
  
  @Column()
  fullName: string;

  @OneToMany(() => Photo, (photo) => photo.client, { cascade: true })
  photos: Photo[];
}
