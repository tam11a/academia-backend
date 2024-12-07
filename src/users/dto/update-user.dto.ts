import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  email?: string;

  @ApiProperty({
    required: false,
    enum: ['STUDENT', 'FACULTY', 'ADMIN'],
    default: 'STUDENT',
  })
  user_role?: 'STUDENT' | 'FACULTY' | 'ADMIN';

  @ApiProperty({
    required: false,
    default: true,
  })
  is_active?: boolean;

  @ApiProperty({
    required: false,
  })
  first_name?: string;

  @ApiProperty({
    required: false,
  })
  last_name?: string;

  @ApiProperty({
    required: false,
  })
  bio?: string;

  @ApiProperty({
    required: false,
  })
  dob?: Date;

  @ApiProperty({
    required: false,
  })
  phone?: string;

  @ApiProperty({
    required: false,
  })
  secondary_phone?: string;

  @ApiProperty({
    required: false,
  })
  secondary_email?: string;

  @ApiProperty({
    required: false,
  })
  address?: string;

  @ApiProperty({
    required: false,
  })
  secondary_address?: string;
}
