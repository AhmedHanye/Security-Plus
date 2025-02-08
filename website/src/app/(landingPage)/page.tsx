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
    <Suspense key={version} fallback={<ContentSkeleton />}>
      <div className="flex flex-col gap-10 px-5 md:px-8 lg:px-12 xl:px-16">
        <Content version={version as string} />
      </div>
    </Suspense>
  );
}
