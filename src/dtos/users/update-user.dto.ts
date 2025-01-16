import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { UserResponse } from './user.reponse';

export class UpdateUserDto {
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

  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}

export const mapUpdateUserDtoToUser = (
  updateUserDto: UpdateUserDto,
  updatedUserId: string,
): UserResponse => ({
  id: updatedUserId,
  name: updateUserDto.name,
  surname: updateUserDto.surname,
  phone: updateUserDto.phone,
  age: updateUserDto.age,
});
