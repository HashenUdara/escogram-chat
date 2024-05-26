import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, buttonVariants } from "../ui/button";
import {
  LifeBuoy,
  MessageCircle,
  SquareUser,
  Triangle,
  UserRoundPlusIcon,
  Users2,
} from "lucide-react";

import EscogramLogo from "@/../public/img/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
const SideNav = () => {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Image src={EscogramLogo} alt="Escogram Logo" className=" size-5" />
          {/* <Triangle className="size-5 fill-foreground" /> */}
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-lg"
                )}
                aria-label="Models"
                href={"/dashboard"}
              >
                <MessageCircle className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Chats
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-lg"
                )}
                aria-label="API"
                href={"/dashboard/add"}
              >
                <UserRoundPlusIcon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Friends
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default SideNav;
