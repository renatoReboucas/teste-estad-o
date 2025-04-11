import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  try {
    const filePath = path.join(__dirname, '../../noticias.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const noticias = JSON.parse(data);

    for (const noticia of noticias) {
      await prisma.news.create({
        data: {
          ...noticia,
          data_hora_publicacao: new Date(noticia.data_hora_publicacao)
        }
      });
    }
    console.log('Seed realizado com sucesso!');
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();