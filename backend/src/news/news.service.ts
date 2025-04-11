import { Injectable } from '@nestjs/common';
import  { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}
  async listAllNews(): Promise<any> {
    return await this.prisma.news.findMany();
  }
}
