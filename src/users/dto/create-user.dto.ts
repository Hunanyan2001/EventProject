import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserDto extends PartialType(UserEntity) {
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  age: number;
  phone: string;
}

export const mapCreateUserDtoToEntity = (
  createUserDto: CreateUserDto,
): UserEntity => ({
  id: uuidv4(),
  name: createUserDto.name,
  surname: createUserDto.surname,
  phone: createUserDto.phone,
  age: createUserDto.age,
});
