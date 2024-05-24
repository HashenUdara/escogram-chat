import React, { ReactNode } from "react";

const SideBarWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="relative hidden flex-col items-start gap-4 md:flex col-span-3"
      x-chunk="dashboard-03-chunk-0"
    >
      <h1 className="  font-semibold text-lg">Chats</h1>
      <div className=" w-full">{children}</div>
    </div>
  );
};

export default SideBarWrapper;
