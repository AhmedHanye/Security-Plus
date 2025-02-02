import { versionNames } from "@/lib/data";

import Version from "./version";
import { Suspense } from "react";
import Content from "./content";
import ContentSkeleton from "./contentSkeleton";

const Releases = async ({ version }: { version?: string }) => {
  const versions: string[] = await versionNames();
  const getLastVersion = () => versions[versions.length - 1];

  return (
    <section className="py-custom px-custom snap-start flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl font-black">
          Releases
        </h1>
          <Version
            versions={versions}
            currentVersion={version || getLastVersion()}
          />
      </div>
      <Suspense key={version} fallback={<ContentSkeleton />}>
        <div className="xl:px-16 lg:px-12 md:px-8 px-5 flex flex-col gap-10">
          <Content version={version || getLastVersion()} />
        </div>
      </Suspense>
    </section>
  );
};

export default Releases;
