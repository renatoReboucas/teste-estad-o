-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "editoria" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "data_hora_publicacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "imagem" TEXT NOT NULL,
    "imagem_thumb" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
