
import type { PageParams } from "@/types/NewsPage";
import ClientNewsContent from "@/Components/ClientNewsContent";

export default async function NewsPage({
  params,
}: {
  params: PageParams
}) {

  return (
    <div className="min-h-screen p-5">
      <ClientNewsContent editoria={params?.editoria} urlPart={params?.urlPart} />
    </div>
  );
}