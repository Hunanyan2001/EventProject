import { Injectable } from '@nestjs/common';
import {
  mapUpdateUserDtoToUser,
  UpdateUserDto,
} from '../../dtos/users/update-user.dto';
import { User } from '../../entities/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserDto,
  UserResponse,
  mapCreateUserDtoToEntity,
  mapUserToUserResponse,
  mapUsersToUsersResponse,
} from 'src/dtos';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await mapCreateUserDtoToEntity(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return mapUserToUserResponse(savedUser);
  }

  async findAll(): Promise<UserResponse[]> {
    return mapUsersToUsersResponse(await this.userRepository.find());
  }

  async findOne(id: string) {
    return mapUserToUserResponse(await this.userRepository.findOneBy({ id }));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return new Error('this user is not found');
    }
    const updatedUser = mapUpdateUserDtoToUser(updateUserDto, user.id);
    return this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<string> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    return `User with ID ${id} has been removed`;
  }
}
