-- AlterTable
ALTER TABLE "News" ALTER COLUMN "editoria" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "titulo" DROP NOT NULL,
ALTER COLUMN "subtitulo" DROP NOT NULL,
ALTER COLUMN "imagem" DROP NOT NULL,
ALTER COLUMN "imagem_thumb" DROP NOT NULL,
ALTER COLUMN "conteudo" DROP NOT NULL;
