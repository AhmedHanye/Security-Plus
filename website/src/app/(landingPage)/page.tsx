import { Suspense } from "react";
import ContentSkeleton from "@/components/release/contentSkeleton";
import Content from "@/components/release/content";

// TODO: optimize the app

export default async function Page({
  searchParams,
}: {
  searchParams: { version?: string };
}) {
  const version = (await Promise.resolve(searchParams))?.version?.toLowerCase();

  return (
    <div className="flex flex-col gap-10 px-5 md:px-8 lg:px-12 xl:px-16">
      <Suspense key={version} fallback={<ContentSkeleton />}>
        <Content version={version as string} />
      </Suspense>
    </div>
  );
}
