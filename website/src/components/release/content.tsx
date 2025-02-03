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
        />
      </div>
      <div>
        <h2 className="text-3xl max-lg:text-2xl max-md:text-xl font-black">
          Discover the Powerful Features of Security Plus:
        </h2>
        <Features data={data.features as string[]} color={false} />
        <h3 className="text-2xl max-lg:text-xl max-md:text-lg font-black">
          New Features 🎉
        </h3>
        <Features data={data.new as string[]} color={true} />
      </div>
    </>
  ) : (
    <div className="h-screen center">
      <p className="text-2xl font-black">{version} doesn&apos;t exist</p>
    </div>
  );
};

export default Content;
