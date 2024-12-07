import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiProperty({
    required: true,
  })
  email: string;

  @ApiProperty({
    required: true,
  })
  password: string;

  @ApiProperty({
    required: true,
    enum: ['STUDENT', 'FACULTY', 'ADMIN'],
    default: 'STUDENT',
  })
  user_role: 'STUDENT' | 'FACULTY' | 'ADMIN';

  @ApiProperty({
    required: true,
    default: true,
  })
  is_active: boolean;
}
