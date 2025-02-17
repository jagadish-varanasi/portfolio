import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
});

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex flex-col gap-y-4`}>{children}</div>
  );
}

export default layout;
