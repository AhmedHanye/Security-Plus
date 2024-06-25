import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { DownloadGithubFolder } from "browser-github-folder-downloader";

const Home = ({ setCurrentPage }: { setCurrentPage: Function }) => {
  const [downloading, setDownloading] = useState(false);
  // set current page to 0
  useEffect(() => {
    setCurrentPage(0);
  }, []);
  // GSAP animations
  useGSAP(() => {
    const ourText = new SplitType("#Home h1", { types: "chars" });
    const chars = ourText.chars;
    const tl = gsap.timeline();
    tl.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.018,
        duration: 0.1,
        ease: "power4.out",
      }
    );
    tl.from("#Home button", { y: 30, opacity: 0, duration: 0.4 });
  }, []);
  return (
    <section
      id={"Home"}
      className="flex flex-col h-screen gap-10 items-center justify-center"
    >
      <h1
        className={
          "text-3xl font-bold max-md:text-xl max-sm:text-sm text-nowrap text-center whitespace-pre-line"
        }
      >
        Security Plus Extension: <wbr></wbr> A Great Tool for Keeping You Safe
        Online
      </h1>
      <div className={"flex gap-5 text-lg max-md:text-sm max-sm:text-xs"}>
        <button
          type="button"
          className="text-white flex items-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            window.open("https://github.com/AhmedHanye/Security-Plus");
          }}
        >
          Source Code
          <FontAwesomeIcon icon={faGithub} />
        </button>
        <button
          type="button"
          className="focus:outline-none text-white flex items-center gap-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => {
            setDownloading(true);
            DownloadGithubFolder(
              "https://api.github.com/repos/AhmedHanye/Security-Plus/contents/Extension/dist",
              "Security-Plus"
            ).then(() => {
              setDownloading(false);
            });
          }}
          disabled={downloading}
        >
          {downloading ? (
            <>
              <span>Downloading...</span>
              <FontAwesomeIcon className="animate-spin" icon={faCircleNotch} />
            </>
          ) : (
            <>
              <span>Download</span>
              <FontAwesomeIcon icon={faDownload} />
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default Home;
