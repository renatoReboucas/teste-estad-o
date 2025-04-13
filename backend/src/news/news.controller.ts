import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update.news.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService){}

  @Get()
  async getNews(@Query() paginationDto:PaginationDto) {
    return await this.newsService.listAllNews(paginationDto)
  }

  @Get(":editoria/:urlPart")
  async findExpecificNews(
    @Param('editoria') editoria: string,
    @Param('urlPart') urlPart: string
  ) {
    return await this.newsService.listSpecificNews(editoria, urlPart);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imagem', maxCount: 1 },
    { name: 'imagem_thumb', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './public',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async createNews(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFiles() files: { imagem?: Express.Multer.File[], imagem_thumb?: Express.Multer.File[] }
  ) {
    const imagem = files.imagem?.[0];
    const imagemThumb = files.imagem_thumb?.[0];
    
    return await this.newsService.createNews(createNewsDto, imagem, imagemThumb);
  }

  @Patch(":id")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imagem', maxCount: 1 },
    { name: 'imagem_thumb', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './public',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async updateNews(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFiles() files: { imagem?: Express.Multer.File[], imagem_thumb?: Express.Multer.File[] }
  ) {
    const imagem = files?.imagem?.[0];
    const imagemThumb = files?.imagem_thumb?.[0];
    
    return await this.newsService.updateNews(id, updateNewsDto, imagem, imagemThumb);
  }

  @Delete(":id")
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.deleteNews(id)
  }
}
