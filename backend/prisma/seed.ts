import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Executando seed...');

    const defaultUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin',
        password: 'admin123'
      }
    });

    const filePath = path.join(__dirname, '../assets/noticias.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const noticias = JSON.parse(jsonData);

    for (const noticia of noticias) {
      await prisma.news.create({
        data: {
          editoria: noticia.editoria,
          url: noticia.url,
          titulo: noticia.titulo,
          subtitulo: noticia.subtitulo,
          imagem: noticia.imagem,
          imagem_thumb: noticia.imagem_thumb,
          conteudo: noticia.conteudo,
          data_hora_publicacao: new Date(noticia.data_hora_publicacao),
          userId: defaultUser.id
          }
        })
      }
    
    console.log('Seed realizado com sucesso!');
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });