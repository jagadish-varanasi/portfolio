import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNav from "./components/side-nav";
import { Separator } from "@repo/ui/components/separator";
import Header from "./components/header";
import Promotion from "./components/promotions";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jagadish V",
  description: "Welcome to my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-inter antialiased bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200 tracking-tight`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="min-h-screen flex">
            <SideNav />
            <main className="grow overflow-hidden px-6">
              <div className="w-full h-full max-w-[1072px] mx-auto flex flex-col">
                <Header />
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
