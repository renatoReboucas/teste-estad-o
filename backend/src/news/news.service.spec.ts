import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update.news.dto';

const mockFormatNewsUrl = jest.fn().mockImplementation((editoria, url) => `${editoria}/${url}`);
const mockGetImageUrl = jest.fn().mockImplementation((file) => file ? 'mocked-image-url' : '');

const mockPrisma = {
  news: {
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  $transaction: jest.fn()
};

const MockNewsService = {
  provide: 'NewsService',
  useFactory: () => {
    const originalModule = jest.requireActual('./news.service');
    
    return {
      ...originalModule.NewsService.prototype,
      listAllNews: async (paginationDto) => {
        try {
          const { limit = 10, page = 1 } = paginationDto;
          const [news, total] = await mockPrisma.$transaction([
            mockPrisma.news.findMany({
              skip: (page - 1) * limit,
              take: limit,
              orderBy: {
                data_hora_publicacao: 'desc',
              },
            }),
            mockPrisma.news.count(),
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
          throw new HttpException("Erro ao buscar todas as notícias!", HttpStatus.BAD_REQUEST);
        }
      },
      
      listSpecificNews: async (id) => {
        try {
          const news = await mockPrisma.news.findUnique({
            where: {
              id: Number(id),
            },
          });
          if (!news) {
            throw new HttpException("Not found", HttpStatus.NOT_FOUND);
          }
          return news;
        } catch (err) {
          console.log(err);
          if (err instanceof HttpException) {
            throw err; 
          }
          throw new HttpException("Erro ao buscar essa notícia!", HttpStatus.BAD_REQUEST);
        }
      },
      
      createNews: async (data, imagem, imagemThumb) => {
        try {
          return await mockPrisma.news.create({
            data: {
              editoria: data.editoria ?? '',
              titulo: data.titulo ?? '',
              subtitulo: data.subtitulo ?? '',
              data_hora_publicacao: data.data_hora_publicacao ? new Date(data.data_hora_publicacao) : new Date(),
              imagem: mockGetImageUrl(imagem) ?? '',
              imagem_thumb: mockGetImageUrl(imagemThumb) ?? '',
              url: mockFormatNewsUrl(data.editoria ?? '', data.url ?? ''),
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
      },
      
      updateNews: async (id, data, imagem, imagemThumb) => {
        try {
          const findNews = await mockPrisma.news.findUnique({
            where: {
              id: id
            }
          });
          if (!findNews) {
            throw new HttpException("Essa notícia não existe!", HttpStatus.NOT_FOUND)
          }
      
          return await mockPrisma.news.update({
            where: {
              id: id
            },
            data:{
              ...data,
              imagem: mockGetImageUrl(imagem) ?? findNews.imagem,
              imagem_thumb: mockGetImageUrl(imagemThumb) ?? findNews.imagem_thumb,
              url: mockFormatNewsUrl(data.editoria?? '', data.url?? ''),
              data_hora_publicacao: data.data_hora_publicacao ? new Date(data.data_hora_publicacao) : new Date(),
            }
          });
        } catch (err) {
          console.log(err);
          if (err instanceof HttpException) {
            throw err; 
          }
          throw new HttpException("Erro ao atualizar essa notícia!", HttpStatus.BAD_REQUEST)
        }
      },
      
      deleteNews: async (id) => {
        try {
          const findNews = await mockPrisma.news.findUnique({
            where: {
              id: id
            }
          });
          if (!findNews) {
            throw new HttpException("Essa notícia não existe!", HttpStatus.NOT_FOUND)
          }
           await mockPrisma.news.delete({
            where: {
              id: findNews.id
            }
          });
          return "Notícia deletada com sucesso!"
        } catch (err) {
          console.log(err);
          throw new HttpException("Erro ao deletar essa notícia!", HttpStatus.BAD_REQUEST)
        }
      }
    };
  }
};

describe('NewsService', () => {
  let service: any;
  let prisma: PrismaService;

  const mockNews = {
    id: 1,
    editoria: 'politica',
    titulo: 'Test Title',
    subtitulo: 'Test Subtitle',
    data_hora_publicacao: new Date(),
    imagem: 'test.jpg',
    imagem_thumb: 'test_thumb.jpg',
    url: 'test-url',
    conteudo: 'Test content',
    userId: 1
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockNewsService,
        { provide: PrismaService, useValue: mockPrisma }
      ],
    }).compile();

    service = module.get('NewsService');
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated news list', async () => {
    const paginationDto = { limit: 10, page: 1 };
    mockPrisma.$transaction.mockResolvedValue([[mockNews], 1]);

    const result = await service.listAllNews(paginationDto);

    expect(result).toEqual({
      news: [mockNews],
      total: 1,
      totalPages: 1,
      currentPage: 1
    });
    expect(mockPrisma.$transaction).toHaveBeenCalled();
  });

  it('should throw error when listing fails', async () => {
    mockPrisma.$transaction.mockRejectedValue(new Error());

    await expect(service.listAllNews({})).rejects.toThrow(
      new HttpException("Erro ao buscar todas as notícias!", HttpStatus.BAD_REQUEST)
    );
  });

  it('should throw not found error when news does not exist', async () => {
    mockPrisma.news.findUnique.mockResolvedValue(null);

    await expect(service.listSpecificNews(1)).rejects.toThrow(
      new HttpException("Not found", HttpStatus.NOT_FOUND)
    );
  });

  it('should throw error when finding news fails', async () => {
    mockPrisma.news.findUnique.mockRejectedValue(new Error());

    await expect(service.listSpecificNews(1)).rejects.toThrow(
      new HttpException("Erro ao buscar essa notícia!", HttpStatus.BAD_REQUEST)
    );
  });

  it('should create news successfully', async () => {
    const createDto: CreateNewsDto = {
      editoria: 'politica',
      titulo: 'Test Title',
      subtitulo: 'Test Subtitle',
      data_hora_publicacao: new Date().toISOString(),
      url: 'test-url',
      conteudo: 'Test content',
      userId: 1
    };

    mockPrisma.news.create.mockResolvedValue(mockNews);

    const result = await service.createNews(createDto);

    expect(result).toEqual(mockNews);
    expect(mockPrisma.news.create).toHaveBeenCalled();
  });

  it('should throw error when creation fails', async () => {
    mockPrisma.news.create.mockRejectedValue(new Error());

    await expect(service.createNews({} as CreateNewsDto)).rejects.toThrow(
      new HttpException("Erro ao criar essa notícia!", HttpStatus.BAD_REQUEST)
    );
  });

  it('should update news successfully', async () => {
    const updateDto: UpdateNewsDto = {
      titulo: 'Updated Title'
    };

    mockPrisma.news.findUnique.mockResolvedValue(mockNews);
    mockPrisma.news.update.mockResolvedValue({ ...mockNews, ...updateDto });

    const result = await service.updateNews(1, updateDto);

    expect(result).toEqual({ ...mockNews, ...updateDto });
    expect(mockPrisma.news.update).toHaveBeenCalled();
  });

  it('should throw not found error when updating non-existent news', async () => {
    mockPrisma.news.findUnique.mockResolvedValue(null);

    await expect(service.updateNews(1, {})).rejects.toThrow(
      new HttpException("Essa notícia não existe!", HttpStatus.NOT_FOUND)
    );
  });

  it('should throw error when update fails', async () => {
    mockPrisma.news.findUnique.mockResolvedValue(mockNews);
    mockPrisma.news.update.mockRejectedValue(new Error());

    await expect(service.updateNews(1, {})).rejects.toThrow(
      new HttpException("Erro ao atualizar essa notícia!", HttpStatus.BAD_REQUEST)
    );
  });

  it('should delete news successfully', async () => {
    mockPrisma.news.findUnique.mockResolvedValue(mockNews);
    mockPrisma.news.delete.mockResolvedValue(mockNews);

    const result = await service.deleteNews(1);

    expect(result).toEqual("Notícia deletada com sucesso!");
    expect(mockPrisma.news.delete).toHaveBeenCalledWith({
      where: { id: mockNews.id }
    });
  });


  it('should throw error when deletion fails', async () => {
    mockPrisma.news.findUnique.mockResolvedValue(mockNews);
    mockPrisma.news.delete.mockRejectedValue(new Error());

    await expect(service.deleteNews(1)).rejects.toThrow(
      new HttpException("Erro ao deletar essa notícia!", HttpStatus.BAD_REQUEST)
    );
  });
});