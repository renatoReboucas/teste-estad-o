export class ResponseNewsDto {
    url: string;
    editoria: string | null;
    id: number;
    titulo: string | null;
    subtitulo: string | null;
    data_hora_publicacao: Date | null;
    imagem: string | null;
    imagem_thumb: string | null;
    conteudo: string | null;
    updatedAt: Date | null;
}

export class PaginatedNewsResponseDto {
    news: object[];
    total: number;
    totalPages: number;
    currentPage: number;
}

export type StringResponseType = string;
