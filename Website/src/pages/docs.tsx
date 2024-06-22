import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Docs = ({ setCurrentPage }: { setCurrentPage: Function }) => {
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#intro h1", { y: 30, opacity: 0, duration: 0.3 });
    tl.from("#intro p", { y: 30, opacity: 0, duration: 0.3 });
    tl.from("#tutorial", { y: 20, opacity: 0, duration: 0.3 });
  }, []);
  return (
    <section id={"Docs"} className={"flex flex-col"}>
      <div
        id="intro"
        className={
          "h-screen flex flex-col justify-center gap-10 max-sm:gap-5 px-10 py-24"
        }
      >
        <h1
          className={
            "text-5xl font-semibold flex gap-5 max-lg:text-4xl max-md:text-2xl"
          }
        >
          <FontAwesomeIcon icon={faBook} />
          Documentation
        </h1>
        <p className={"text-xl max-lg:text-lg max-md:text-sm"}>
          Welcome to the documentation page. Here you will find all the
          information you need to get started with the Security Plus Extension.
        </p>
        <div id={"tutorial"} className="w-full h-full bg-black rounded-3xl"></div>
      </div>
      <div>

      </div>
    </section>
  );
};

export default Docs;
