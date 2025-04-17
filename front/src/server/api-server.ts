import type { News, NewsForm, NewsType, TypedFormData } from "@/types/News";
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
async function deleteNews(id: number) {
  const response = await api.delete<News>(`/news/${id}`);
  if (response.status === 200) {
    return response.data
  }
}

async function getNewsById(id: number) {
  const response = await api.get<News>(`/news/${id}`);
  if (response.status === 200) {
    return response.data
  }
}

async function createNews(submitFormData: TypedFormData<NewsForm>) {
  const response = await api.post('/news', submitFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if (response.status === 201) {
    return response.status
  }
}

async function updateNews(id: number, submitFormData: TypedFormData<NewsForm>) {
  const response = await api.patch(`/news/${id}`, submitFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if (response.status === 200) {
    return response.status
  }
}

export const newsApi = {
  getNews,
  getSpecificNews,
  deleteNews,
  getNewsById,
  createNews,
  updateNews
};