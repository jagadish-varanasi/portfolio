import React from "react";
import ListCard from "./list-card";

const techData = {
  heading: "Technical Skills",
  items: [
    "Javascript",
    "React",
    "Typescript",
    "T-3 Stack",
    "NextJS",
    "Angular",
    "Java",
    "React Native",
    "TailwindCSS",
    "Python",
    "Material UI",
    "Product Design",
    "UI/UX",
  ],
};

function Tech() {
  return <ListCard heading={techData.heading} items={techData.items} />;
}

export default Tech;
