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
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  IPaginationQuery,
  LimitQuery,
  PageQuery,
  SearchQuery,
} from 'src/utils/pagination/query.dto';

@ApiTags('Courses')
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  @ApiQuery({
    name: 'course_id',
    required: false,
  })
  @ApiQuery(PageQuery) // PageQuery, reusing the PageQuery from the pagination query
  @ApiQuery(LimitQuery) // LimitQuery, reusing the LimitQuery from the pagination query
  @ApiQuery(SearchQuery) // SearchQuery, reusing the SearchQuery from the pagination query
  findAll(
    @Query() query: IPaginationQuery,
    @Query('course_id') course_id?: number,
  ) {
    return this.sectionService.findAll(query, +course_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
