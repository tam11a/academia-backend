import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationQuery } from 'src/utils/pagination/query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}
  private coursesection_default_select: Prisma.CourseSectionSelect = {
    id: true,
    course_id: true,
    section_title: true,
    section_description: true,
    section_total_seats: true,
    _count: {
      select: {
        course_section_student_enrollments: true,
        course_section_faculty_assignments: true,
      },
    },
    created_at: true,
    updated_at: true,
  };
  async create(createSectionDto: CreateSectionDto) {
    const {
      course_id,
      section_title,
      section_description,
      section_total_seats,
    } = createSectionDto;

    try {
      const data = await this.prisma.courseSection.create({
        data: {
          course_id,
          section_title,
          section_description,
          section_total_seats,
        },
        select: this.coursesection_default_select,
      });

      return {
        message: 'Section created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async findAll(
    { search = '', limit = 10, page = 0 }: IPaginationQuery,
    course_id?: number,
  ) {
    const query: Prisma.CourseSectionFindManyArgs = {
      where: {
        OR: [
          {
            section_title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            section_description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: limit,
      skip: page * limit,
      select: this.coursesection_default_select,
    };

    if (course_id) {
      query.where.course_id = course_id; // Filter by course id
    }

    const [
      data, // data is an array of courses
      total, // total is the total number of courses
    ] = await this.prisma.$transaction([
      this.prisma.courseSection.findMany(query),
      this.prisma.courseSection.count({ where: query.where }),
    ]);

    return {
      message: `List of sections, limit: ${limit}, page: ${page}`,
      data,
      total,
      limit,
      page,
    };
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Section id is required');
    }

    const data = await this.prisma.courseSection.findUnique({
      where: {
        id,
      },
      select: this.coursesection_default_select,
    });

    if (!data) {
      throw new NotFoundException('Section not found');
    }

    return {
      message: `Section with id: ${id}`,
      data,
    };
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    if (!id) {
      throw new BadRequestException('Section id is required');
    }

    const { section_title, section_description, section_total_seats } =
      updateSectionDto;

    try {
      const data = await this.prisma.courseSection.update({
        where: {
          id,
        },
        data: {
          section_title,
          section_description,
          section_total_seats,
        },
        select: this.coursesection_default_select,
      });

      return {
        message: `Section with id: ${id} updated successfully`,
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('Section id is required');
    }

    try {
      await this.prisma.courseSection.delete({
        where: {
          id,
        },
        select: this.coursesection_default_select,
      });

      return {
        message: `Section with id: ${id} deleted successfully`,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Section not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }
}
