import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Chat } from './chat.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  phone: string;
  @Column()
  surname: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
}
