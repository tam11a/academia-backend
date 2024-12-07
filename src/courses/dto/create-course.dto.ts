import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    required: true,
  })
  course_title: string;

  @ApiProperty({
    required: false,
  })
  course_description?: string;

  @ApiProperty({
    required: false,
  })
  course_cover_url?: string;

  @ApiProperty({
    required: true,
  })
  course_start_date: Date;

  @ApiProperty({
    required: true,
  })
  course_end_date: Date;

  @ApiProperty({
    required: true,
  })
  course_code: string;

  @ApiProperty({
    required: true,
  })
  course_credits: number;

  @ApiProperty({
    required: false,
    enum: ['PLANNED', 'ENROLLING', 'ONGOING', 'COMPLETED'],
    default: 'PLANNED',
  })
  course_status?: 'PLANNED' | 'ENROLLING' | 'ONGOING' | 'COMPLETED';
}
