import { Metadata } from "next";
import { Suspense } from "react";
import ContentSkeleton from "@/components/release/contentSkeleton";
import Content from "@/components/release/content";

export const metadata: Metadata = {
  title: "Security Plus",
  description:
    "Security Plus is a browser extension that adds an extra layer of security to your browsing experience. It intercepts page loads and provides detailed security analysis using VirusTotal and WhoIs before allowing access.",
};

// TODO: add version change mechanism
// TODO Complete the download button
// TODO: optimize the app

export default async function Page({
  searchParams,
}: {
  searchParams: { version?: string };
}) {
  const params = await Promise.resolve(searchParams);
  const version = params?.version;
  return (
    <Suspense key={version} fallback={<ContentSkeleton />}>
      <div className="xl:px-16 lg:px-12 md:px-8 px-5 flex flex-col gap-10">
        <Content version={version as string} />
      </div>
    </Suspense>
  );
}
