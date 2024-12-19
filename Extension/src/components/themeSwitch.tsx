import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStorageVariable from "@/hooks/storageVariable";

export default function ThemeSwitch() {
  const { value: themeConfig, setValue: setTheme } = useStorageVariable({
    key: "theme",
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="theme-toggle"
          variant={"theme"}
          className="rounded-full my-auto z-[99999] size-10 fixed bottom-8 right-8"
          size="icon"
        >
          <SunIcon className="rotate-0 scale-[1.56] transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-[1.56]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-neutral-700 rounded-lg"
      >
        {["light", "dark", "system"].map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            className={`cursor-pointer ${
              themeOption === themeConfig
                ? "bg-neutral-100 dark:bg-neutral-500"
                : ""
            }`}
            onSelect={() => {
              // @ts-expect-error: setThemeInLocalStorage is defined in an external script
              setThemeInLocalStorage(themeOption);
              setTheme(themeOption);
            }}
          >
            {themeOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
