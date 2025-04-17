"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { newsApi } from "@/server/api-server";
import NewsForm from "@/Components/NewsForm";
import Loading from "@/Components/Loading";

export default function NewsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const queryClient = useQueryClient()


  const { data, isLoading } = useQuery({
    queryKey: ["news-edit"],
    queryFn: async () => {
      if (isNew) return null;
      try {
        return await newsApi.getNewsById(Number(id));
      } catch (error) {
        console.error("Erro ao buscar notícia:", error);
        return null;
      }
    },
    enabled: !isNew,
    refetchOnWindowFocus: true,
  });

  const handleSuccess = () => {
    queryClient.resetQueries()
    router.push("/admin");
  };

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">
          {isNew ? "Nova Notícia" : "Editar Notícia"}
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loading />
          </div>
        ) : (
          <NewsForm initialData={data || undefined} onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
}