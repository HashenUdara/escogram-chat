import React from "react";
import { Button } from "../ui/button";
import { CircleUser, Share } from "lucide-react";
import { ModeToggle } from "../theme-toggler";
import Image from "next/image";
import { Session } from "next-auth";
import SignOutButton from "../SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const Header = ({ session }: { session: any }) => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Escogram Chats</h1>

      <div className=" ml-auto flex items-center space-x-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full my-auto"
            >
              {session.user.image ? (
                <Image
                  // referrerPolicy="no-referrer"
                  className="rounded-full size-10"
                  src={session.user.image || ""}
                  alt="Your profile picture"
                  width={50}
                  height={50}
                />
              ) : (
                <CircleUser className=" size-6" />
              )}

              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className=" flex flex-col">
                {session.user.name}
                <span className="text-xs text-zinc-400" aria-hidden="true">
                  {session.user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
