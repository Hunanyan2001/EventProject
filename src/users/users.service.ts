import { Injectable } from '@nestjs/common';
import { CreateUserDto, mapCreateUserDtoToEntity } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await mapCreateUserDtoToEntity(createUserDto);
    return this.userRepository.insert(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      return new Error('this user is not found');
    }

    Object.assign(updatedUser, updateUserDto);
    return updatedUser;
  }

  async remove(id: string): Promise<string> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    return `User with ID ${id} has been removed`;
  }
}
