import { User } from '../../entities/user';
import { IsString, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  surname?: string;

  @IsNumber()
  @ApiProperty()
  age: number;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}

export const mapCreateUserDtoToEntity = (
  createUserDto: CreateUserDto,
): User => ({
  id: uuidv4(),
  name: createUserDto.name,
  surname: createUserDto.surname,
  phone: createUserDto.phone,
  age: createUserDto.age,
  createdAt: new Date(),
  updatedAt: new Date(),
});
