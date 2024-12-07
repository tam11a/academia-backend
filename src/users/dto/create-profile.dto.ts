import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    required: true,
  })
  first_name: string;

  @ApiProperty({
    required: false,
  })
  last_name: string;

  @ApiProperty({
    required: false,
  })
  bio: string;

  @ApiProperty({
    required: false,
  })
  dob: Date;

  @ApiProperty({
    required: true,
  })
  phone: string;

  @ApiProperty({
    required: false,
  })
  secondary_phone?: string;

  @ApiProperty({
    required: false,
  })
  secondary_email?: string;

  @ApiProperty({
    required: true,
  })
  address: string;

  @ApiProperty({
    required: false,
  })
  secondary_address?: string;
}
