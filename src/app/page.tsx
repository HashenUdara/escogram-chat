"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import EscogramLogo from "@/../public/img/logo-sec.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
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
