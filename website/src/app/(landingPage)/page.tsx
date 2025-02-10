import { Suspense } from "react";
import ContentSkeleton from "@/components/release/contentSkeleton";
import Content from "@/components/release/content";

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const version = resolvedSearchParams?.version?.toLowerCase();

  return (
    <div className="flex flex-col gap-10 px-5 md:px-8 lg:px-12 xl:px-16">
      <Suspense key={version} fallback={<ContentSkeleton />}>
        <Content version={version as string} />
      </Suspense>
    </div>
  );
}
