import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found with this email');
    }

    // Compare the password with the hash
    const isMatch = await bcrypt.compare(password, user.passhash);

    if (!isMatch) {
      throw new BadRequestException('Invalid Password');
    }

    // Return the user
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
        user_role: user.user_role,
      }),
      token_type: 'bearer',
      expires_in: process.env.JWT_EXPIRY || '3d',
    };
  }

  validate(user: any) {
    return user;
  }

  logout() {
    return 'This action logs out the user';
  }
}
