import { ApiProperty } from '@nestjs/swagger';

export class UpdateSectionDto {
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
    default: 0,
  })
  section_total_seats?: number;
}
