import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async create() {
    const user = await this.userRepository.create({
      email: 'olz@gmail.com',
      firstName: 'tobi',
      lastName: 'ola',
      password: 'pass',
    });
    return await this.userRepository.save(user);
  }
}
