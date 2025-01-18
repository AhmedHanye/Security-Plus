import { Input } from "@/components/ui/input";
import Title from "@/hooks/title";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquareArrowOutUpRight } from "lucide-react";

const SecurityCheck = () => {
  Title("Security Check");

  // ** Handle the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the URL value from the form
    let url = e.currentTarget.url.value.trim();

    try {
      // Add 'https://' if the URL doesn't already include a protocol
      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }

      // Validate and normalize the URL using the URL constructor
      const validUrl = new URL(url);

      // Open the sanitized and encoded URL
      window.open(`#/check/${encodeURIComponent(validUrl.href)}`, "_blank");
    } catch (error) {
      console.error("Invalid URL", error);
      alert("Please enter a valid URL.");
    }
  };
  return (
    <section id="security-check" className="center h-full flex-col gap-8 pb-20">
      <h1 className="xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-extrabold heading-color py-2">
        Security Check
      </h1>
      <form
        className="w-9/12 max-md:w-11/12 relative h-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          className="rounded-full font-bold h-full ps-4 pe-12 border-2 placeholder:text-[1.05rem]"
          type="text"
          placeholder="Enter URL"
          name="url"
          required
          autoFocus
          style={{ fontSize: "1rem" }}
          aria-label="Enter URL"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="absolute bg-foreground h-full w-12 right-0 center rounded-e-full top-1/2 -translate-y-1/2 text-secondary group"
              aria-label="Check"
            >
              <SquareArrowOutUpRight
                size={23}
                className="group-hover:stroke-[2.6px] transition-all duration-100 will-change-transform"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            Check the URL for malicious content
          </TooltipContent>
        </Tooltip>
      </form>
      <p className="text-center">
        Check website or domain for malicious content, phishing, and other using{" "}
        <a
          href="https://www.virustotal.com/gui/home/upload"
          className="px-1 text-lg font-bold text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          target="_blank"
        >
          VirusTotal
        </a>
        and
        <a
          href="https://who.is/"
          className="px-1 text-lg font-bold text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          target="_blank"
        >
          WhoIs .
        </a>
      </p>
    </section>
  );
};
export default SecurityCheck;
