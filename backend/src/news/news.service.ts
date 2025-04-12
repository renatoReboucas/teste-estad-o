import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import  { PrismaService } from '../prisma/prisma.service';
import type { CreateNewsDto } from './dto/create-news.dto';
import type { UpdateNewsDto } from './dto/update.news.dto';
import type { News } from '@prisma/client';
import type { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class NewsService {
  constructor(private readonly  prisma: PrismaService) {}

  async listAllNews(paginationDto: PaginationDto): Promise<any> {
    try {
      const { limit = 10, page =1 } = paginationDto;

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
        throw err; // Repassar exceções HTTP já formatadas
      }
      throw new HttpException("Erro ao buscar todas as notícias!", HttpStatus.BAD_REQUEST);
    }
  }

  async listSpecificNews(id: number): Promise<News> {
      try {
        const news = await this.prisma.news.findUnique({
          where: {
            id: Number(id),
          },
        });
        if (news) return news;
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
      } catch (err) {
        console.log(err);
        throw new HttpException("Erro ao buscar essa notícia!", HttpStatus.BAD_REQUEST)
      }
  }
  async createNews(data: CreateNewsDto): Promise<News> {
    try {
      return await this.prisma.news.create({
        data: {
          editoria: data.editoria ?? '',
          titulo: data.titulo ?? '',
          subtitulo: data.subtitulo ?? '',
          data_hora_publicacao: data.data_hora_publicacao ? new Date(data.data_hora_publicacao) : new Date(),
          imagem: data.imagem ?? '',
          imagem_thumb: data.imagem_thumb ?? '',
          url: data.url ?? '',
          conteudo: data.conteudo ?? '',
          user:{
            connect:{
              id: data.userId
            }
          }
        }
      });
    } catch (err) {
      console.log(err);
      throw new HttpException("Erro ao criar essa notícia!", HttpStatus.BAD_REQUEST)
    }
  }
  async updateNews(id: number,data:UpdateNewsDto) {
    try {
      const findNews = await this.prisma.news.findUnique({
        where: {
          id: id
        }
      })
      if (!findNews) {
        throw new HttpException("Essa notícia não existe!", HttpStatus.NOT_FOUND)
      }
  
      return await this.prisma.news.update({
        where: {
          id: id
        },
        data:{
          ...data,
          data_hora_publicacao: data.data_hora_publicacao ? new Date(data.data_hora_publicacao) : new Date(),
        }
      })
    } catch (err) {
      console.log(err);
      throw new HttpException("Erro ao atualizar essa notícia!", HttpStatus.BAD_REQUEST)
    }
  }
  async deleteNews(id:number) {
    try {
      const findNews = await this.prisma.news.findUnique({
        where: {
          id: id
        }
      })
      if (!findNews) {
        throw new HttpException("Essa notícia não existe!", HttpStatus.NOT_FOUND)
      }
       await this.prisma.news.delete({
        where: {
          id: findNews.id
        }
      })
      return "Notícia deletada com sucesso!"
    } catch (err) {
      console.log(err);
      throw new HttpException("Erro ao deletar essa notícia!", HttpStatus.BAD_REQUEST)
    }
  }
}
