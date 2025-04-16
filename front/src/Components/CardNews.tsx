import type { News } from "@/types/News";
import Image from "next/image";
import Link from "next/link";

export default function CardNews({ news }: { news: News }) {
  return (
    <Link href={`/${news.url}`} className="max-w-sm w-full rounded overflow-hidden shadow-lg bg-white flex flex-col h-[450px]">
      <div className="relative h-48 w-full">
        {news.imagem_thumb && (
          <Image
            src={news.imagem_thumb}
            alt={news.titulo || "News image"}
            fill
            className="object-cover"
          />
        )}
      </div>
      
      <div className="px-4 py-4 flex flex-col flex-grow">
        <div className="text-blue-600 text-xs font-bold uppercase mb-2">
          {news.editoria}
        </div>
        
        <div>
          <h2 className="text-gray-900 font-bold text-xl mb-2 hover:text-blue-700 line-clamp-2">
            {news.titulo}
          </h2>
        </div>
        
        <p className="text-gray-700 text-sm mb-3 line-clamp-3 flex-grow">
          {news.subtitulo}
        </p>
        
        <div className="text-gray-500 text-xs mt-auto pt-2 border-t">
          {news.data_hora_publicacao && (
            <p>Publicado em: {new Date(news.data_hora_publicacao).toLocaleDateString('pt-BR')}</p>
          )}
        </div>
      </div>
    </Link>
  );
}