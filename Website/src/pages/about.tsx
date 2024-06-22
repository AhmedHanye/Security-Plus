import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const About = ({ setCurrentPage }: { setCurrentPage: Function }) => {
  useEffect(() => {
    setCurrentPage(2);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#About h1", { y: 30, opacity: 0, duration: 0.4 });
    tl.from("#About p", { y: 30, opacity: 0, duration: 0.4 });
  }, []);
  return (
    <section id={"About"} className={"flex flex-col"}>
      <div className={"h-screen flex flex-col gap-20 justify-center px-10"}>
        <div className="flex flex-col gap-5">
          <h1 className={"text-3xl max-md:text-xl max-sm:text-lg font-bold"}>
            About Extension
          </h1>
          <p className={"text-xl max-md:text-lg max-sm:text-sm ps-5 "}>
            Security Plus Extension is an extra layer of security for your
            browser. It will help you to protect your browser from malicious
            websites by scaning the website using virustotal Before you allow
            the website to load. You will only allow websites that you trust to
            load in your browser.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className={"text-3xl max-md:text-xl max-sm:text-lg font-bold"}>
            Creator
          </h1>
          <p
            className={
              "text-xl max-md:text-lg max-sm:text-sm ps-5 flex flex-col items-start gap-4"
            }
          >
            <span>Ahmed Hanye</span>
            <span>Full Stack Web Developer</span>
            <span className="flex gap-5">
              <a
                href="https://github.com/AhmedHanye"
                className={
                  "text-2xl hover:scale-110 transform transition-all duration-100"
                }
                target="_blank"
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-hanye-a66096253?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BEurj17IxS6Cam8aVIcVSlA%3D%3D"
                className={
                  "text-2xl hover:scale-110 transform transition-all duration-100"
                }
                target="_blank"
                title="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
