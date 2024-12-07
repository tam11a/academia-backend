import { ApiProperty } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
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

  @ApiProperty({
    required: true,
    type: CreateProfileDto,
  })
  profile: CreateProfileDto;
}
