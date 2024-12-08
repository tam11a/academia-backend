import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSectionDto } from './create-section.dto';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {
  @ApiProperty({
    required: false,
  })
  course_id?: number;

  @ApiProperty({
    required: false,
  })
  section_title?: string;

  @ApiProperty({
    required: false,
  })
  section_description?: string;

  @ApiProperty({
    required: false,
  })
  section_total_seats?: number;
}
