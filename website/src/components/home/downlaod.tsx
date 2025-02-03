import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Code } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import Spinner from "../spinner";
import dynamic from "next/dynamic";
const DownloadData = dynamic(() => import("./downloadData"));

const Download = async () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn center bg-[#16A34A]">
          <span>Download</span>
          <Image
            src="/images/download.svg"
            width={32}
            height={32}
            className="max-md:size-6"
            alt="github logo"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Get Security Plus for Your Browser</DialogTitle>
          <DialogDescription>
            Get real-time protection with advanced tools. Stay safe from
            malicious websites and protect your browsing experience.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[50vh]" scrollHideDelay={0} type="always">
          <Suspense
            fallback={
              <div className="h-[50vh] center">
                <Spinner />
              </div>
            }
          >
            <DownloadData />
          </Suspense>
        </ScrollArea>
        <DialogFooter>
          <a
            href="https://github.com/AhmedHanye/Security-Plus/releases/"
            title="Security Plus Releases"
            target="_blank"
            className="ms-auto"
          >
            <Code />
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Download;
