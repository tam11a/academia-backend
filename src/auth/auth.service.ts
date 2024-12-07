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

    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
      user_role: user.user_role,
    });

    await this.prisma.authSession.create({
      data: {
        user_id: user.id,
        token: access_token,
      },
    });

    // Return the user
    return {
      access_token,
      token_type: 'bearer',
      expires_in: process.env.JWT_EXPIRY || '3d',
    };
  }

  validate(user: any) {
    return user;
  }

  async logout(auth_session: any) {
    // Update the auth session to expire the token
    await this.prisma.authSession.update({
      where: {
        id: auth_session.id,
      },
      data: {
        expired_at: new Date(),
      },
    });

    return {
      message: 'Logged out successfully',
    };
  }
}
