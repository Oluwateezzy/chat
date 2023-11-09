import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async login(data) {
    try {
      const user = await this.userRepository.findOneBy({ email: data.email });
      if (user && user.password == data.password) {
        const token = sign({ ...user }, 'secrete');
        return { token, user };
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
