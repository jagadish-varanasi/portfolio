import type { Metadata } from "next";
import "@repo/ui/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@repo/ui/components/toaster";
import { TooltipProvider } from "@repo/ui/components/tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TrackEase",
  description: "Track your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NuqsAdapter>
          <ReactQueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ReactQueryProvider>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
