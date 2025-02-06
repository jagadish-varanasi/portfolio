"use client";
import { addDetails, DetailsContext } from "@/context/DetailsContext";
import { Badge } from "@repo/ui/components/badge";
import { View } from "lucide-react";
import React, { useContext } from "react";

function ViewDetails({ type, id }: { type: string; id: string }) {
  const detailsContext = useContext(DetailsContext);

  if (!detailsContext) {
    throw new Error("NestedComponent must be used within a ThemeProvider");
  }

  const { state, dispatch } = detailsContext;

  function handleClick() {
    console.log(state, dispatch, "click", id);
    dispatch({
      type: "ADD_REQUIREMENT",
      payload: { id, data: (Math.random() * 1000).toString() },
    });
  }
  return (
    <Badge
      variant="outline"
      className="cursor-pointer hover:bold"
      onClick={handleClick}
    >
      <View className="h-4 w-4 mr-1" />
      View Details
    </Badge>
  );
}

export default ViewDetails;
