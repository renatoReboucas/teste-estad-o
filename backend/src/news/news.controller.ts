import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update.news.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todas as notícias, com ou sem paginação.' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Número da página. Padrão: 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Número máximo de itens por página. Padrão: 10',
  })
  async getNews(@Query() paginationDto: PaginationDto) {
    return await this.newsService.listAllNews(paginationDto);
  }

  @Get(':editoria/:urlPart')
  @ApiOperation({ summary: 'Lista uma notícia específica pela url.' })
  async findExpecificNews(@Param('editoria') editoria: string, @Param('urlPart') urlPart: string) {
    return await this.newsService.listSpecificNews(editoria, urlPart);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Lista uma notícia específica pelo id.' })
  async findNewsById(@Param('id') id: number) {
    return await this.newsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova notícia.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateNewsDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imagem', maxCount: 1 },
        { name: 'imagem_thumb', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      },
    ),
  )
  async createNews(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFiles()
    files: {
      imagem?: Express.Multer.File[];
      imagem_thumb?: Express.Multer.File[];
    },
  ) {
    const imagem = files.imagem?.[0];
    const imagemThumb = files.imagem_thumb?.[0];

    return await this.newsService.createNews(createNewsDto, imagem, imagemThumb);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma notícia.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateNewsDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    example: 1,
    description: 'ID da notícia a ser atualizada.',
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imagem', maxCount: 1 },
        { name: 'imagem_thumb', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      },
    ),
  )
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFiles()
    files: {
      imagem?: Express.Multer.File[];
      imagem_thumb?: Express.Multer.File[];
    },
  ) {
    const imagem = files?.imagem?.[0];
    const imagemThumb = files?.imagem_thumb?.[0];

    return await this.newsService.updateNews(id, updateNewsDto, imagem, imagemThumb);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    example: 1,
    description: 'ID da notícia a ser atualizada.',
  })
  @ApiOperation({ summary: 'Deleta uma notícia.' })
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.deleteNews(id);
  }
}
