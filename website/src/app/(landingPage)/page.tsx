import Releases from "@/components/release/releases";
import ReleaseLoading from "@/components/release/releaseLoading";
import { Metadata } from "next";
import { Suspense } from "react";

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
    <Suspense key={version} fallback={<ReleaseLoading />}>
      <Releases version={version} />
    </Suspense>
  );
}
