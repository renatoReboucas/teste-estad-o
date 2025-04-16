export interface NewsType {
  news: News[]
  total: number
  totalPages: number
  currentPage: number
}

export interface News {
  id?: number
  editoria: string
  url: string
  titulo: string
  subtitulo: string
  data_hora_publicacao: string
  imagem: string
  imagem_thumb: string
  conteudo: string
  updatedAt: string
}

export interface NewsForm {
  id?: number
  editoria: string
  url: string
  titulo: string
  subtitulo: string
  data_hora_publicacao: string
  imagem: File
  imagem_thumb: File
  conteudo: string
  updatedAt: string
}
