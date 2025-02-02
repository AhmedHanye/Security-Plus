import { Skeleton } from "../ui/skeleton";

const ContentSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[45vw] rounded-lg" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
    </>
  );
};

export default ContentSkeleton;
