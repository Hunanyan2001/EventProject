import { IUser } from '../interfaces/user.interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  phone: string;
  @Column()
  surname: string;
}
