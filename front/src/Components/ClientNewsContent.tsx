"use client";
import { useQuery } from "@tanstack/react-query";
import { newsApi } from "@/server/api-server";
import Loading from "./Loading";
import Image from "next/image";
import { Calendar } from "lucide-react";
import type { PageParams } from "@/types/NewsPage";

export default function ClientNewsContent({editoria,urlPart}: PageParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["news-specific", editoria, urlPart],
    queryFn: () => newsApi.getSpecificNews(editoria, urlPart),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : (
        <article className="bg-white rounded-lg overflow-hidden">
          <div className="p-2 text-sm font-bold uppercase text-blue-500">
            {data?.editoria || editoria}
          </div>

          <div className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data?.titulo}
            </h1>

            <h2 className="text-xl text-gray-700 mb-6">{data?.subtitulo}</h2>

            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
              {data?.data_hora_publicacao && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(data.data_hora_publicacao)}</span>
                </div>
              )}
            </div>
          </div>
          {data?.imagem && (
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image
                src={data.imagem}
                alt={data.titulo || "Article image"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            {data?.conteudo && (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: data.conteudo }}
              />
            )}
          </div>
        </article>
      )}
    </div>
  );
}

