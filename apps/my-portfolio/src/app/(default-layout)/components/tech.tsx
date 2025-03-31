import React from "react";
import ListCard from "./list-card";

const techData = {
  heading: "Technical Skills",
  items: [
    "Javascript",
    "Typescript",
    "React",
    "NextJS",
    "Angular",
    "React Native",
    "Java",
    "Python",
    "TailwindCSS",
    "Material UI",
    "T-3 Stack",
  ],
};

function Tech() {
  return <ListCard heading={techData.heading} items={techData.items} />;
}

export default Tech;
