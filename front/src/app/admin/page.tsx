"use client";
import Table from "@/Components/Table";
import { newsApi } from "@/server/api-server";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Link as Li } from "lucide-react";
import Button from "@/Components/Button";
import { useRouter } from "next/navigation";
import type { News } from "@/types/News";

export default function Admin() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const router = useRouter();

  const { data, isLoading,refetch } = useQuery({
    queryKey: ["admin-news", page, limit],
    queryFn: () => newsApi.getNews(page, limit),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => newsApi.deleteNews(id),
    onSuccess: () => {
      refetch()
    },
  })

  const handlePrevPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => {
    if (data && data.news.length === limit) {
      setPage(page + 1);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/${id}`);
  };

  const handleDelete = async (id: number) => {
    await mutateAsync(id)
  };

  const renderRow = (item: News) => (
    <tr key={item.id} className="border-b">
      <td className="p-4 text-gray-800">{item.titulo}</td>
      <td className="p-4 w-24 text-center">
        <Link
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Li className="text-blue-500 hover:text-blue-700" />
        </Link>
      </td>
      <td className="p-4 w-32">
        <div className="flex justify-center gap-4">
          <Button
            variant="edit"
            onClick={() => handleEdit(item.id)}
            className="p-2"
          >
            <Edit />
          </Button>
          <Button
            variant="destroy"
            onClick={() => handleDelete(item.id)}
            className="p-2"
          >
            <Trash2 />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Notícias</h1>
        <Link
          href="/admin/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nova Notícia
        </Link>
      </div>
      <Table
        columns={["Título", "URL", "Ações"]}
        data={data?.news}
        currentPage={data?.currentPage || 1}
        totalPages={data?.totalPages || 1}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        isLoading={isLoading}
        renderRow={renderRow}
      />
    </div>
  );
}
