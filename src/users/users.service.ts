import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { nanoid } from 'nanoid';
import { IPaginationQuery } from 'src/utils/pagination/query.dto';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, saltOrRounds);
  }

  async create(createUserDto: CreateUserDto) {
    const {
      email,
      password,
      user_role,
      is_active,
      profile: {
        first_name,
        last_name,
        bio,
        dob,
        phone,
        secondary_phone,
        secondary_email,
        address,
        secondary_address,
      },
    } = createUserDto;

    try {
      const data = await this.prisma.user.create({
        data: {
          username: `${last_name.toLowerCase().replace(/\s/g, '')}-${nanoid(3)}`,
          email,
          passhash: await this.hashPassword(password),
          passphrase: speakeasy.generateSecret({ length: 20 }).base32,
          user_role,
          is_active,
          profile: {
            create: {
              first_name,
              last_name,
              bio,
              dob,
              phone,
              secondary_phone,
              secondary_email,
              address,
              secondary_address,
            },
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
          user_role: true,
          is_active: true,
          profile: true,
        },
      });

      return {
        message: 'User created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(
    { search = '', limit = 10, page = 0 }: IPaginationQuery,
    user_role?: 'STUDENT' | 'FACULTY' | 'ADMIN',
  ) {
    const data = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            username: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        AND: [
          {
            user_role: {
              equals: user_role,
            },
          },
        ],
      },
      take: limit,
      skip: page * limit,
      select: {
        id: true,
        username: true,
        email: true,
        user_role: true,
        is_active: true,
        profile: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            bio: true,
            dob: true,
            phone: true,
            secondary_phone: true,
            secondary_address: true,
            secondary_email: true,
            address: true,
            created_at: true,
            updated_at: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
    return {
      message: 'List of all users',
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
