"use client";
import { CardStack } from "@repo/ui/components/card-stack";
import React, { useContext } from "react";
import { CARDS } from "./cards";
import { DetailsContext } from "@/context/DetailsContext";
import { useParams } from "next/navigation";

function DetailsCards() {
  const detailsContext = useContext(DetailsContext);
  const params = useParams();

  if (!detailsContext) {
    throw new Error("NestedComponent must be used within a ThemeProvider");
  }

  const projectId = params["projectId"] as string;
  return (
    <div className="mt-8">
      <CardStack
        data={detailsContext.state}
        items={CARDS}
        projectId={projectId}
      />
    </div>
  );
}

export default DetailsCards;
