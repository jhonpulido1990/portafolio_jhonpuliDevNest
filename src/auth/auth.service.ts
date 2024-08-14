import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOneByUsername(
      registerDto.username,
    );
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const register = await this.usersService.create(registerDto);
    return register;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }
    return await this.usersService.generateToken(loginDto);
  }

  async update(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }
    return await this.usersService.updatePassword(loginDto);
  }
}
