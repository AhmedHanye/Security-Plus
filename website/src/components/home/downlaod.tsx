import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const Download = () => {
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{/* title */}</DialogTitle>
          <DialogDescription>{/* description */}</DialogDescription>
        </DialogHeader>
        {/* body */}
        <DialogFooter>{/* footer */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Download;
