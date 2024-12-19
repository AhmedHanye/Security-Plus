import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobeLock, PanelLeft, Settings, Database } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AsideIcon = ({
  name,
  to,
  Icon,
}: {
  name: string;
  to: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <Tooltip key={name}>
      <TooltipTrigger asChild>
        <Link
          to={to}
          relative="path"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{name}</TooltipContent>
    </Tooltip>
  );
};

const Navbar = () => {
  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col h-full items-center justify-between px-2 sm:py-4">
          <AsideIcon name="Security Check" to="/" Icon={GlobeLock} />
          <div className="flex flex-col gap-2">
            <AsideIcon name="Database" to="/database" Icon={Database} />
            <AsideIcon name="Settings" to="/settings" Icon={Settings} />
          </div>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs pt-12">
              <SheetTitle>Security Plus</SheetTitle>
              <SheetDescription>
                Keep your browsing secure with Security Plus
              </SheetDescription>
              <nav className="grid gap-6 py-10 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <GlobeLock className="h-5 w-5" />
                  Security Check
                </Link>
                <Link
                  to="/database"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Database className="h-5 w-5" />
                  Database
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
