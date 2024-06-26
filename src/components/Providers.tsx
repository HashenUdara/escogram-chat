"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
