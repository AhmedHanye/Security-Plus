"use client";

import { memo, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Version = memo(({ versions }: { versions: string[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentVersion = useMemo(
    () =>
      searchParams.get("version")?.toLowerCase() ||
      versions[versions.length - 1],
    [searchParams, versions],
  );

  const changeVersion = useCallback(
    (version: string) => {
      if (version === currentVersion) return;
      router.push(`?version=${version}`, { scroll: false });
    },
    [router, currentVersion],
  );

  return (
    versions.includes(currentVersion) && (
      <Select
        name="versions"
        defaultValue={currentVersion}
        onValueChange={changeVersion}
      >
        <SelectTrigger
          className="w-fit gap-2 rounded-full bg-zinc-800 px-3 font-bold text-white md:text-lg lg:text-xl"
          aria-label="Change version"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="dark">
          <SelectGroup className="[&>*]:cursor-pointer">
            {versions.map((version) => (
              <SelectItem key={version} value={version}>
                {version}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  );
});

Version.displayName = "Version";

export default Version;
