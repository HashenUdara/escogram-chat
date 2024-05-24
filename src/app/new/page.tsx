import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import React from "react";

const Page = () => {
  return (
    <>
      <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
      <RegisterLink postLoginRedirectURL="/test">Sign up</RegisterLink>
    </>
  );
};

export default Page;
