import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import  { NewsService } from './news.service';
import  { PaginationDto } from '@/common/dto/pagination.dto';
import  { CreateNewsDto } from './dto/create-news.dto';
import  { UpdateNewsDto } from './dto/update.news.dto';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService){}

  @Get()
  async getNews(@Query() paginationDto:PaginationDto) {
    return await this.newsService.listAllNews(paginationDto)
  }

  @Get(":id")
  async findExpecificNews(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.listSpecificNews(id)
  }

  @Post()
  async createNews(@Body() createNewsDto: CreateNewsDto) {
    return await this.newsService.createNews(createNewsDto)
  }

  @Patch(":id")
  async updateNews(@Param('id', ParseIntPipe) id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return await this.newsService.updateNews(id,updateNewsDto)
  }

  @Delete(":id")
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.deleteNews(id)
  }

}
