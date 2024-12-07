import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationQuery } from 'src/utils/pagination/query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  async create(createCourseDto: CreateCourseDto) {
    const {
      course_title,
      course_description,
      course_cover_url,
      course_code,
      course_credits,
      course_start_date,
      course_end_date,
      course_status,
    } = createCourseDto;

    try {
      const data = await this.prisma.course.create({
        data: {
          course_title,
          course_description,
          course_cover_url,
          course_code,
          course_credits,
          course_start_date,
          course_end_date,
          course_status,
        },
      });

      return {
        message: 'Course created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async findAll(
    { search = '', limit = 10, page = 0 }: IPaginationQuery,
    course_status?: 'PLANNED' | 'ENROLLING' | 'ONGOING' | 'COMPLETED',
  ) {
    const query: Prisma.CourseFindManyArgs = {
      where: {
        OR: [
          {
            course_title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            course_code: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        AND: [
          {
            course_status: {
              equals: course_status,
            },
          },
        ],
      },
      take: limit,
      skip: page * limit,
    };

    const [
      data, // data is an array of courses
      total, // total is the total number of courses
    ] = await this.prisma.$transaction([
      this.prisma.course.findMany(query),
      this.prisma.course.count({ where: query.where }),
    ]);

    return {
      message: `List of courses, limit: ${limit}, page: ${page}`,
      data,
      total,
      limit,
      page,
    };
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Please provide a valid course id');
    }

    const data = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!data) throw new NotFoundException('Course not found');

    return {
      message: `Course with id: ${id}`,
      data,
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    if (!id) {
      throw new BadRequestException('Please provide a valid course id');
    }

    const {
      course_title,
      course_description,
      course_cover_url,
      course_code,
      course_credits,
      course_start_date,
      course_end_date,
      course_status,
    } = updateCourseDto;

    try {
      const data = await this.prisma.course.update({
        where: {
          id,
        },
        data: {
          course_title,
          course_description,
          course_cover_url,
          course_code,
          course_credits,
          course_start_date,
          course_end_date,
          course_status,
        },
      });

      return {
        message: 'Course updated successfully',
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Course not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('Please provide a valid course id');
    }

    try {
      const course = await this.prisma.course.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Course deleted successfully',
        course,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Course not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }
}
