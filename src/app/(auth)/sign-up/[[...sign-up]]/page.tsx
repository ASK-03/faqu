import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const page = () => {
  return <SignUp appearance={{ baseTheme: dark }} />;
};

export default page;
