import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  IPaginationQuery,
  LimitQuery,
  PageQuery,
  SearchQuery,
} from 'src/utils/pagination/query.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({
    name: 'user_role',
    required: false,
    enum: ['STUDENT', 'FACULTY', 'ADMIN'],
  })
  @ApiQuery(PageQuery) // PageQuery, reusing the PageQuery from the pagination query
  @ApiQuery(LimitQuery) // LimitQuery, reusing the LimitQuery from the pagination query
  @ApiQuery(SearchQuery) // SearchQuery, reusing the SearchQuery from the pagination query
  findAll(
    @Query() query: IPaginationQuery,
    @Query('user_role') user_role?: 'STUDENT' | 'FACULTY' | 'ADMIN',
  ) {
    return this.usersService.findAll(query, user_role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
