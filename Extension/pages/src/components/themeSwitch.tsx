import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/themeContext";

export default function ThemeSwitch() {
  const { theme, changeTheme } = useTheme();
  const themeWords: Theme[] = ["light", "dark", "system"];
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
        {themeWords.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            className={`cursor-pointer ${
              themeOption === theme ? "bg-neutral-100 dark:bg-neutral-500" : ""
            }`}
            onClick={() => changeTheme(themeOption)}
          >
            {themeOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
