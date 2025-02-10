import Image from "next/image";

const Footer = () => {
  return (
    <footer className="px-custom flex snap-start items-center justify-between bg-[#6D248D] py-4">
      <p className="font-semibold text-white max-md:text-sm">
        © 2025 Security Plus. All rights reserved.
      </p>
      <div className="center flex gap-5 max-md:gap-2">
        <a href="https://github.com/AhmedHanye" target="_blank">
          <div className="relative size-8 max-md:size-6">
            <Image
              src={"/images/github.svg"}
              fill
              className="object-cover"
              alt="linkedin"
            />
          </div>
        </a>

        <a href="https://www.linkedin.com/in/ahmed-hanye" target="_blank">
          <div className="relative size-8 max-md:size-6">
            <Image
              src={"/images/linkedin.svg"}
              fill
              className="object-cover"
              alt="linkedin"
            />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
