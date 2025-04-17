"use client";
import ClientNewsContent from "@/Components/ClientNewsContent";
import { useParams } from "next/navigation";

export default function NewsPage() {
  const params = useParams();
  const editoria = params.editoria as string;
  const urlPart = params.urlPart as string;

  return (
    <div className="min-h-screen p-5">
      <ClientNewsContent editoria={editoria} urlPart={urlPart} />
    </div>
  );
}