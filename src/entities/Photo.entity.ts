import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './Base.entity';
import { User } from './User.entity';
import { Client } from './Client.entity';
import { IsUrl } from 'class-validator';

@Entity('photos', { schema: 'public' })
export class Photo extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @IsUrl()
  url: string;

  @ManyToOne(() => Client, (client) => client.photos)
  client: Client;
}
