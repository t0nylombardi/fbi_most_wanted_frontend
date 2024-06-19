import React, { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="my-8 px-[4rem]">{children}</section>;
};

export default PageWrapper;
