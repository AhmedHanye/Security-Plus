import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

import blockImg from "../assets/block.svg";
import virusTotalImg from "../assets/virustotal.svg";

const Docs = ({ setCurrentPage }: { setCurrentPage: Function }) => {
  // set current page to 1
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  // GSAP animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // intro animation
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#intro",
        start: "top 70%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse", // onEnter, onLeave, onEnterBack, onLeaveBack
      },
    });
    t1.from("#intro h1", { y: 40, opacity: 0, duration: 0.3 });
    t1.from("#intro p", { y: 30, opacity: 0, duration: 0.3 });

    // block requests animation
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#block-requests",
        start: "top 70%",
        end: "bottom 50%",
        toggleActions: "play reverse play reverse", // onEnter, onLeave, onEnterBack, onLeaveBack
      },
    });

    t2.from("#block-requests div", {
      y: 40,
      opacity: 0,
      duration: 0.4,
    });
    t2.from("#block-requests img", {
      x: 40,
      opacity: 0,
      duration: 0.4,
    });

    // virustotal animation
    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#virustotal",
        start: "top 50%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse", // onEnter, onLeave, onEnterBack, onLeaveBack
      },
    });
    t3.from("#virustotal img", {
      x: 40,
      opacity: 0,
      duration: 0.4,
    });

    t3.from("#virustotal p", {
      y: 40,
      opacity: 0,
      duration: 0.4,
    });
  }, []);
  return (
    <section id={"Docs"} className={"flex flex-col"}>
      <div
        id="intro"
        className={
          "h-screen flex flex-col justify-center gap-16 max-sm:gap-5 px-8"
        }
      >
        <h1
          className={
            "text-5xl font-semibold flex gap-5 max-lg:text-4xl max-md:text-3xl"
          }
        >
          <FontAwesomeIcon icon={faBook} />
          Documentation
        </h1>
        <p className={"text-xl max-lg:text-lg max-md:text-sm"}>
          Welcome to the Security Plus Extension Documentation!<br></br> Here,
          you'll find all the information you need to get started and make the
          most of the Security Plus Extension. Whether you're a new user or an
          experienced professional, this guide will provide you with the
          essential knowledge and tools to enhance your security capabilities.
        </p>
      </div>
      <div
        className={"min-h-screen flex items-center justify-between py-20"}
        id="block-requests"
      >
        <div className="w-3/5 max-md:w-full px-8 max-sm:px-3 flex flex-col gap-10 justify-center h-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl max-lg:text-3xl max-md:text-2xl font-bold">
              Blocking All Requests{" "}
              <FontAwesomeIcon className="text-red-600" icon={faShield} />
            </h1>
            <p className="text-lg">
              The Security Plus Extension provides a simple and effective way to
              block all requests for any website. Until you specify whether you
              allow or block the domain or the webiste.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl max-lg:text-2xl max-md:text-xl font-semibold">
              Action Rules{" "}
              <FontAwesomeIcon
                className="dark:text-blue-400 text-blue-600"
                icon={faScaleBalanced}
              />
            </h2>
            <p className="text-lg max-md:text-base">
              The Security Plus Extension allows you to create custom rules to
              block or allow requests based on the domain, URL. The Priority is
              always for website rules.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl max-md:text-lg font-medium">Examples:</h3>
            <ul className="list-disc max-md:text-sm ps-10">
              <li>
                If the domain <code>example.com</code> is blocked, all requests
                to <code>example.com</code> and its subdomains will be blocked,
                and vice versa.
              </li>
              <li>
                If <code>https://example.com/abc</code> is blocked, all requests
                to <code>https://example.com/abc</code> will be blocked, and
                vice versa.
              </li>
              <li>
                If <code>example.com</code> is allowed, all requests to{" "}
                <code>example.com</code> and its subdomains will be allowed.
                However, if <code>https://example.com/abc</code> is blocked, all
                requests to <code>https://example.com/abc</code> will be
                blocked. This is because the priority is always given to
                specific website rules.
              </li>
            </ul>
          </div>
        </div>
        <div className="w-2/5 max-md:hidden">
          <img src={blockImg} alt="block img" />
        </div>
      </div>
      <div
        className="min-h-screen flex flex-col items-center px-5 justify-center gap-16"
        id="virustotal"
      >
        <div className="w-3/5 max-lg:w-4/5 max-md:w-full">
          <img src={virusTotalImg} alt="virustotal image" />
        </div>
        <p className="text-xl max-lg:text-base max-md:text-sm max-sm:text-xs font-semibold text-center">
          The Security Plus Extension provides a simple way to scan the URL
          using VirusTotal. You can scan the URL by activating virustotal and
          seting the API key in the settings. The extension will scan the URL
          and display the results.
        </p>
      </div>
    </section>
  );
};

export default Docs;
