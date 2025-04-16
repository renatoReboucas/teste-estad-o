"use client";
import Button from "@/Components/Button";
import CardNews from "@/Components/CardNews";
import Loading from "@/Components/Loading";
// import Wysiwyg from "@/Components/Wysiwyg";
import { newsApi } from "@/server/api-server";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  // const [value, setValue] = useState<string | undefined>("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["news", page, limit],
    queryFn: () => newsApi.getNews(page, limit),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && data.news && data.news.length === limit) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen p-5">
      
      <div className="flex justify-center my-10 space-x-8">
      <Button onClick={handlePrevPage} variant={page === 1 ? 'disabled' : undefined} >
          <ArrowLeft className="size-6"/>
        </Button>
        <Button onClick={handleNextPage} variant={data?.currentPage === data?.totalPages ? 'disabled' : undefined} disabled={data?.currentPage === data?.totalPages}>
          <ArrowRight className="size-6"/>
        </Button>
      </div>
      {isLoading ? 
        <Loading />
       : 
      (
        <div className="w-full flex flex-row flex-wrap space-y-5 space-x-3">
        {data && data?.news ? (
          <>
          <div></div>
            {data.news.map((item) => (
              <CardNews key={item.id} news={item} />
            ))}
          </>
        ) : (
          <p>No news available</p>
        )}
      </div>
      )
    }
    </div>
  );
}
