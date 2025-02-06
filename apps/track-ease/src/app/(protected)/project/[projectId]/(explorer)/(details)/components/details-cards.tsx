"use client";
import { CardStack } from "@repo/ui/components/card-stack";
import React, { useContext } from "react";
import { CARDS } from "./cards";
import { DetailsContext } from "@/context/DetailsContext";

function DetailsCards() {
  const detailsContext = useContext(DetailsContext);

  if (!detailsContext) {
    throw new Error("NestedComponent must be used within a ThemeProvider");
  }


  return (
    <div className="mt-8">
      <CardStack data={detailsContext.state} items={CARDS} />
    </div>
  );
}

export default DetailsCards;
