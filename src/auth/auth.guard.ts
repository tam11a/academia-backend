import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const auth_session = await this.prisma.authSession.findUnique({
        where: {
          user_id: payload.sub,
          token,
        },
      });

      if (!auth_session) {
        throw new UnauthorizedException('Invalid token');
      }

      if (auth_session.expired_at) {
        throw new UnauthorizedException(
          `Token expired at ${auth_session.expired_at}`,
        );
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
        select: {
          id: true,
          email: true,
          username: true,
          is_active: true,
          user_role: true,
          profile: {
            select: {
              first_name: true,
              last_name: true,
              bio: true,
              secondary_email: true,
              phone: true,
              secondary_phone: true,
              address: true,
              secondary_address: true,
              dob: true,
              created_at: true,
              updated_at: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException("User doesn't exist");
      }

      if (!user.is_active)
        throw new UnauthorizedException(
          'User is not active. Please contact the administrator.',
        );

      request['user'] = user;
      request['auth_session'] = auth_session;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
