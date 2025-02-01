"use client";
import { Button } from "@repo/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <Button variant="ghost" size="icon" className={className} onClick={() => router.back()}>
      <ArrowLeft/>
    </Button>
  );
}

export default BackButton;
