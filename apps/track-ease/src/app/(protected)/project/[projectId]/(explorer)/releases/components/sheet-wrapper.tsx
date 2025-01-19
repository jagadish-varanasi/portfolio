"use client";
import { Sheet } from "@repo/ui/components/sheet";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function SheetWrapper({
  children,
  projectId,
}: Readonly<{
  children: React.ReactNode;
  projectId: string;
}>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const draftId =
    !!searchParams.get("draftId") ||
    !!searchParams.get("create") ||
    !!searchParams.get("releaseId");
  const openedTab = searchParams.get("tab");
  return (
    <Sheet
      open={draftId}
      onOpenChange={(e) => {
        router.push(
          `/project/${projectId}/releases?tab=${openedTab || "current"}`
        );
      }}
    >
      {children}
    </Sheet>
  );
}

export default SheetWrapper;
