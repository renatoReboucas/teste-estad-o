import type { News, NewsType } from "@/types/News";
import { api } from "./api";

async function getNews(page: number = 1, limit: number = 10) {
  const response = await api.get<NewsType>(`/news?page=${page}&limit=${limit}`);
  if (response.status === 200) {
    return response.data
  }
}

async function getSpecificNews(editorial: string, urlPart: string) {
  const response = await api.get<News>(`/news/${editorial}/${urlPart}`);
  if (response.status === 200) {
    return response.data
  }
}

export const newsApi = {
  getNews,
  getSpecificNews
};