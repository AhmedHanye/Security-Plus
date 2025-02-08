"use client";
import Image from "next/image";

const SourceCode = () => {
  return (
    <button
      className="btn center bg-[#24282E]"
      onClick={() =>
        window.open("https://github.com/AhmedHanye/Security-Plus", "_blank")
      }
    >
      <span>Source Code</span>
      <Image
        src="/images/github.svg"
        width={33.82}
        height={32}
        className="max-md:h-6"
        alt="github logo"
      />
    </button>
  );
};

export default SourceCode;
