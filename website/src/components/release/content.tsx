import { getVersionData } from "@/lib/data";
import Features from "./features";

const Content = async ({ version }: { version: string }) => {
  const data = await getVersionData(version);
  return data?.video ? (
    <>
      <div className="h-[45vw]">
        <iframe
          width="100%"
          height="100%"
          className="rounded-lg"
          src={data.video as string}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div>
        <h2 className="text-3xl font-black max-lg:text-2xl max-md:text-xl">
          Discover the Powerful Features of Security Plus:
        </h2>
        <Features data={data.features as string[]} color={false} />
        {Array.isArray(data.new) && data.new.length > 0 && (
          <>
            <h3 className="text-2xl font-black max-lg:text-xl max-md:text-lg">
              New Features 🎉
            </h3>
            <Features data={data.new} color={true} />
          </>
        )}
      </div>
    </>
  ) : (
    <div className="center h-screen">
      <p className="text-2xl font-black">{version} doesn&apos;t exist</p>
    </div>
  );
};

export default Content;
