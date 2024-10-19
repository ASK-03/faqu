import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const page = () => {
  return <SignIn appearance={{ baseTheme: dark }} />;
};

export default page;
