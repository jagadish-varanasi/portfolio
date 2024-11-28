import React from "react";
import ListCard from "./list-card";

const toolsData = {
  heading: "Tools I know",
  items: ["Git", "Github", "Figma", "VS Code", "Expo", "Azure"],
};

function Tools() {
  return <ListCard heading={toolsData.heading} items={toolsData.items} />;
}

export default Tools;
