"use client";
import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-between gap-4">{children}</div>;
};

export default layout;
