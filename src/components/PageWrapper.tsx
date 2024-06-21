import React from "react";
import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="my-2 px-[4rem] h-dvh">{children}</section>;
};

export default PageWrapper;
