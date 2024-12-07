import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiProperty({
    required: false,
  })
  course_title?: string;

  @ApiProperty({
    required: false,
  })
  course_description?: string;

  @ApiProperty({
    required: false,
  })
  course_cover_url?: string;

  @ApiProperty({
    required: false,
  })
  course_start_date?: Date;

  @ApiProperty({
    required: false,
  })
  course_end_date?: Date;

  @ApiProperty({
    required: false,
  })
  course_code?: string;

  @ApiProperty({
    required: false,
  })
  course_credits?: number;

  @ApiProperty({
    required: false,
    enum: ['PLANNED', 'ENROLLING', 'ONGOING', 'COMPLETED'],
    default: 'PLANNED',
  })
  course_status?: 'PLANNED' | 'ENROLLING' | 'ONGOING' | 'COMPLETED';
}
