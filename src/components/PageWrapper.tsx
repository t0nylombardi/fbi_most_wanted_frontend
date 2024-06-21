import React from "react";
import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="my-[8rem] px-[4rem] h-screen overflow-hidden">{children}</section>;
};

export default PageWrapper;
