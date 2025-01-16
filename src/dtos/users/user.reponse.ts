import { User } from 'src/entities/user';
import { v4 as uuidv4 } from 'uuid';

export class UserResponse {
  id: string;
  name: string;
  surname: string;
  phone: string;
  age: number;
}

export const mapUserToUserResponse = (user: User): UserResponse => ({
  id: user.id || uuidv4(),
  name: user.name,
  surname: user.surname,
  phone: user.phone,
  age: user.age,
});

export const mapUsersToUsersResponse = (users: User[]): UserResponse[] =>
  users.map(mapUserToUserResponse);
