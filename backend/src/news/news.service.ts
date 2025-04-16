import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateNewsDto } from './dto/create-news.dto';
import type { UpdateNewsDto } from './dto/update.news.dto';
import type { PaginationDto } from '../common/dto/pagination.dto';
import { formatNewsUrl, removeAccents } from '../common/utils/url.helper';
import { getImageUrl } from '../common/utils/image.helper';
import type {
  PaginatedNewsResponseDto,
  ResponseNewsDto,
  StringResponseType,
} from './dto/response-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) { }

  async listAllNews(paginationDto: PaginationDto): Promise<PaginatedNewsResponseDto> {
    try {
      const { limit = 10, page = 1 } = paginationDto;

      const [news, total] = await this.prisma.$transaction([
        this.prisma.news.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            data_hora_publicacao: 'desc',
          },
        }),
        this.prisma.news.count(),
      ]);

      return {
        news,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Erro ao buscar todas as notícias!', HttpStatus.NOT_FOUND);
    }
  }

  async listSpecificNews(editoria: string, urlPart: string): Promise<ResponseNewsDto> {
    try {
      const news = await this.prisma.news.findFirst({
        where: {
          url: `${editoria}/${urlPart}`,
        },
      });
      if (news) return news;
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (err) {
      console.log(err);
      throw new HttpException('Erro ao buscar essa notícia!', HttpStatus.NOT_FOUND);
    }
  }
  async findById(id: number): Promise<ResponseNewsDto> {
    try {
      const news = await this.prisma.news.findFirst({
        where: {
          id: id,
        },
      });
      if (news) return news;
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (err) {
      console.log(err);
      throw new HttpException('Erro ao buscar essa notícia!', HttpStatus.NOT_FOUND);
    }
  }
  async createNews(
    data: CreateNewsDto,
    imagem?: Express.Multer.File,
    imagemThumb?: Express.Multer.File,
  ): Promise<ResponseNewsDto> {
    try {
      return await this.prisma.news.create({
        data: {
          editoria: data.editoria ?? '',
          titulo: data.titulo ?? '',
          subtitulo: data.subtitulo ?? '',
          data_hora_publicacao: data.data_hora_publicacao
            ? new Date(data.data_hora_publicacao)
            : new Date(),
          imagem: getImageUrl(imagem) ?? '',
          imagem_thumb: getImageUrl(imagemThumb) ?? '',
          url: await formatNewsUrl(data.editoria ?? '', data.url ?? ''),
          conteudo: data.conteudo ?? '',
        },
      });
    } catch (err) {
      console.log(err);
      throw new HttpException('Erro ao criar essa notícia!', HttpStatus.BAD_REQUEST);
    }
  }

  async updateNews(
    id: number,
    data: UpdateNewsDto,
    imagem?: Express.Multer.File,
    imagemThumb?: Express.Multer.File,
  ): Promise<ResponseNewsDto> {
    try {
      const findNews = await this.prisma.news.findUnique({
        where: {
          id: id,
        },
      });
      if (!findNews) {
        throw new HttpException('Essa notícia não existe!', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.news.update({
        where: {
          id: id,
        },
        data: {
          ...data,
          imagem: getImageUrl(imagem) ?? findNews.imagem,
          imagem_thumb: getImageUrl(imagemThumb) ?? findNews.imagem_thumb,
          url: await formatNewsUrl(data.editoria ?? '', data.url ?? ''),
          data_hora_publicacao: data.data_hora_publicacao
            ? new Date(data.data_hora_publicacao)
            : new Date(),
        },
      });
    } catch (err) {
      console.log(err);
      throw new HttpException('Erro ao atualizar essa notícia!', HttpStatus.BAD_REQUEST);
    }
  }
  async deleteNews(id: number): Promise<StringResponseType> {
    try {
      const findNews = await this.prisma.news.findUnique({
        where: {
          id: id,
        },
      });
      if (!findNews) {
        throw new HttpException('Essa notícia não existe!', HttpStatus.NOT_FOUND);
      }
      await this.prisma.news.delete({
        where: {
          id: findNews.id,
        },
      });
      return 'Notícia deletada com sucesso!';
    } catch (err) {
      console.log(err);
      throw new HttpException('Erro ao deletar essa notícia!', HttpStatus.BAD_REQUEST);
    }
  }
}
