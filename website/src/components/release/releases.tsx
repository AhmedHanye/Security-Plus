import { versionNames } from "@/lib/data";
import Version from "./version";
import React from "react";

const Releases = async ({ children }: { children: React.ReactNode }) => {
  const versions: string[] = await versionNames();

  return (
    <section className="py-custom px-custom snap-start flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl font-black">
          Releases
        </h1>
        <Version versions={versions} />
      </div>
      {children}
    </section>
  );
};

export default Releases;
