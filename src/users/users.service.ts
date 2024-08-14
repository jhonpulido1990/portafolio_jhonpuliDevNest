import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const username = createUserDto.username;
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  /* async updatePassword(username: string, newPassword: string): Promise<void> {
    await this.userRepository.update({ username }, { password: newPassword });
  } */

  /* async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  } */

  async updatePassword(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.update(
      { username },
      { password: hashedPassword },
    );
    return 'Success';
  }

  async generateToken(user: User): Promise<any> {
    const username = user.username;
    const payload = { username };
    const token = await this.jwtService.signAsync(payload);
    return { token, username };
  }
}
