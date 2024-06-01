"use client";

import { FC, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import EscogramLogo from "@/../public/img/logo-sec.svg";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
const Page: FC = () => {
  return (
    <div className=" flex   h-screen w-full items-center justify-center">
      <div>
        <Image
          src={EscogramLogo}
          alt="Escogram Logo"
          className=" mx-auto mb-4 w-56"
        />
        <Card className="mx-auto  w-80 md:w-96">
          <CardHeader>
            <CardTitle className="text-2xl">Hey there!</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <LoginLink
                className={buttonVariants()}
                postLoginRedirectURL="/dashboard"
              >
                Sign in
              </LoginLink>

              <RegisterLink
                className={buttonVariants({ variant: "secondary" })}
                postLoginRedirectURL="/welcome"
              >
                Sign up
              </RegisterLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
