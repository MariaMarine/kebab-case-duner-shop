import { UserDTO } from './../models/user.DTO';
import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {

  private users: UserDTO[] = [
    { username: 'maria', password: 'ninjacode', role: 'admin' },
  ];

  getAll(): UserDTO[] {
    return this.users;
  }
  getByUsername(username: string): boolean {
    const usernames: string [] = this.users.map(x => x.username);
    return usernames.indexOf(username) >= 0;
  }

  add(user: UserDTO): void {
    const usernames: string [] = this.users.map(x => x.username);
    if (usernames.indexOf(user.username) > 0) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    user.role = 'user';
    this.users.push(user);
  }

  isLoggedIn(user: any) {
    return !!this.users.find(
      x =>
        x.username === user.username && x.password === user.password);
  }
}