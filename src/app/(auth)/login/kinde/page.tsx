import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import EscogramLogo from "@/../public/img/logo-sec.svg";

const Page: FC = () => {
  return (
    <div className=" flex   h-screen w-full items-center justify-center">
      <div>
        <Image
          src={EscogramLogo}
          alt="Escogram Logo"
          className=" mx-auto mb-4 w-48"
        />
        <Card className="mx-auto  w-80 md:w-96">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
            <RegisterLink postLoginRedirectURL="/welcome">Sign up</RegisterLink>
            <LogoutLink>Log out</LogoutLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
