import Download from "@/components/home/downlaod";
import SourceCode from "@/components/home/sourceCode";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="flex h-screen flex-col bg-[url('/images/background.svg')] bg-cover bg-center bg-no-repeat py-custom px-custom snap-start">
      <div className="flex items-center gap-x-3 max-md:gap-x-2" id="logo">
        <Image
          src="/images/logo.webp"
          width={42}
          height={42}
          className="max-lg:size-9 max-md:size-8"
          alt="logo"
        />
        <p className="text-[1.8rem] font-bold text-white max-lg:text-2xl max-md:text-xl">
          Security Plus
        </p>
      </div>
      <div className="center my-auto flex-col gap-y-9 text-center">
        <h1 className="w-fit bg-gradient-to-r from-purpleLight via-purpleLight to-blueLight bg-clip-text text-3xl font-black text-transparent md:text-4xl lg:text-[2.625rem]">
          Enhance your browsing safety with advanced security features
        </h1>
        <p className="w-11/12 text-base font-bold text-white md:w-10/12 md:text-lg lg:w-8/12 lg:text-xl">
          Security Plus is a powerful extension designed to elevate your online
          security. It provides advanced features such as proactive website
          blocking, customizable action specifications, and domain-level
          controls, ensuring a safer and more secure browsing experience
        </p>
        <div className="center flex-wrap gap-5">
          <SourceCode />
          <Download />
        </div>
      </div>
    </section>
  );
};
export default Home;
