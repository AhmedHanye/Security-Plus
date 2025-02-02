import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-4 px-custom bg-[#6D248D] flex items-center justify-between snap-start">
      <p className="text-white font-semibold max-md:text-sm">
        © 2025 Security Plus. All rights reserved.
      </p>
      <div className="flex center gap-5 max-md:gap-2">
        <Image
          src={"/images/github.svg"}
          width={30.77}
          height={30}
          className="max-md:w-auto max-md:h-6"
          alt="github"
        />
        <Image
          src={"/images/linkedin.svg"}
          width={30}
          height={30}
          className="max-md:size-6"
          alt="twitter"
        />
      </div>
    </footer>
  );
};

export default Footer;
