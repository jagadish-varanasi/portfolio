import type { Metadata } from "next";
import localFont from "next/font/local";
import "@repo/ui/globals.css";
import Notes from "./components/notes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NoteIt",
  description:
    "Streamline your note-taking experience while keeping your data secure on your local device. With the power of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Notes>{children}</Notes>
      </body>
    </html>
  );
}
