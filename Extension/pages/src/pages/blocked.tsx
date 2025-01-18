import { Button } from "@/components/ui/button";
import { House, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Blocked = () => {
  const { url } = useParams();
  return (
    <main className="h-screen center flex-col pb-10">
      <img
        src="blocked.svg"
        width={1008}
        height={672}
        className="mx-auto"
        alt="blocked img"
      />
      <div className="center gap-5">
        <Button className="font-bold md:w-56 md:h-12 md:text-2xl text-lg">
          <Link
            to={`/check/${encodeURIComponent(url as string)}`}
            className="center md:gap-3 gap-2"
            replace
          >
            <House
              className="md:!size-6 !size-5 dark:text-yellow-500 text-yellow-300"
              strokeWidth={3}
            />
            <span>Edit Status</span>
          </Link>
        </Button>
        <Button className="font-bold md:w-56 md:h-12 md:text-2xl text-lg">
          <Link to="/" className="center md:gap-3 gap-2" replace>
            <Wrench
              className="md:!size-6 !size-5 dark:text-yellow-500 text-yellow-300"
              strokeWidth={3}
            />
            <span>Go Home</span>
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default Blocked;
