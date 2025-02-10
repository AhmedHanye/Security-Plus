import { Skeleton } from "../ui/skeleton";

const ContentSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[45vw] rounded-lg" />
      <Skeleton className="h-10 max-md:h-5" />
      <Skeleton className="h-10 max-md:h-5" />
      <Skeleton className="h-10 max-md:h-5" />
      <Skeleton className="h-10 max-md:h-5" />
    </>
  );
};

export default ContentSkeleton;
