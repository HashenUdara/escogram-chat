import React from "react";
import { Button } from "../ui/button";
import { Share } from "lucide-react";
import { ModeToggle } from "../theme-toggler";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Escogram Chats</h1>
      <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
        <Share className="size-3.5" />
        Share
      </Button>
      <ModeToggle />
    </header>
  );
};

export default Header;
