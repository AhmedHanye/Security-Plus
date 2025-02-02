"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const Version = ({
  versions,
  currentVersion,
}: {
  versions: string[];
  currentVersion: string;
}) => {
  const router = useRouter();
  const changeVersion = (version: string) => {
    if (version === currentVersion) return;
    router.push(`?version=${version}`, { scroll: false });
  };  
  return (
    <Select
      name="versions"
      onValueChange={(value) => changeVersion(value)}
      defaultValue={currentVersion}
    >
      <SelectTrigger
        className="w-fit gap-2 rounded-full px-3 lg:text-xl md:text-lg font-bold bg-zinc-800 text-white"
        aria-label="Change version"
      >
        <SelectValue placeholder={currentVersion} />
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
  );
};

export default Version;
