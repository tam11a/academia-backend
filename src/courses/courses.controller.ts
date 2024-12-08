import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiQuery } from '@nestjs/swagger';
import {
  IPaginationQuery,
  LimitQuery,
  PageQuery,
  SearchQuery,
} from 'src/utils/pagination/query.dto';

// @ApiBearerAuth()
// @UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiQuery({
    name: 'course_status',
    required: false,
    enum: ['PLANNED', 'ENROLLING', 'ONGOING', 'COMPLETED'],
  })
  @ApiQuery(PageQuery) // PageQuery, reusing the PageQuery from the pagination query
  @ApiQuery(LimitQuery) // LimitQuery, reusing the LimitQuery from the pagination query
  @ApiQuery(SearchQuery) // SearchQuery, reusing the SearchQuery from the pagination query
  findAll(
    @Query() query: IPaginationQuery,
    @Query('course_status')
    course_status?: 'PLANNED' | 'ENROLLING' | 'ONGOING' | 'COMPLETED',
  ) {
    return this.coursesService.findAll(query, course_status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
