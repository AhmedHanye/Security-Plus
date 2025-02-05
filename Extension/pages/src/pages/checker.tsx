import CheckerCtrl from "@/components/checker/checkerCtrl";
import CheckerTool from "@/components/checker/checkerTool";
import Window from "@/components/checker/window";
import useStorageVariable from "@/hooks/storageVariable";
import Title from "@/hooks/title";
import { virusTotalUrl, whoIsUrl } from "@/lib/scanUtils";
import { JSX } from "react";
import { useParams } from "react-router-dom";

const Checker = () => {
  Title("Checker");
  const { url } = useParams();

  // * Know which tools are enabled
  const { value: virusTotal } = useStorageVariable({
    key: "virusTotal",
    defaultValue: "false",
  });
  const { value: whois } = useStorageVariable({
    key: "whoIs",
    defaultValue: "false",
  });

  // * Set the default URL for the tools
  let virusTotalUrlResult = "https://www.virustotal.com/gui/home/upload";
  let whoIsUrlResult = "https://who.is/";

  // * Get the URL for the tools if enabled
  if (virusTotal === "true") virusTotalUrlResult = virusTotalUrl(url as string);
  if (whois === "true") whoIsUrlResult = whoIsUrl(url as string);

  // * Widgets for the window (tools & controler)
  const widgets: { [key: string]: JSX.Element } = {
    a: <CheckerCtrl url={url} />,
    b:
      virusTotal === "true" ? (
        <CheckerTool name="virustotal" url={virusTotalUrlResult} />
      ) : (
        <></>
      ),
    c:
      whois === "true" ? (
        <CheckerTool name="whois" url={whoIsUrlResult} />
      ) : (
        <></>
      ),
  };

  return (
    <main id="checker" className="pb-10 h-screen">
      <Window
        widgets={widgets}
        virusTotalUrlResult={virusTotalUrlResult}
        whoIsUrlResult={whoIsUrlResult}
      />
    </main>
  );
};

export default Checker;
