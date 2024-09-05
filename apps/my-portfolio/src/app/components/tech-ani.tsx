import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const slides = [
  { icon: "react", url: "/tech/react-svgrepo-com.svg", width: 30, height: 30 },
  {
    icon: "angular",
    url: "/tech/angular-svgrepo-com.svg",
    width: 30,
    height: 30,
  },
  { icon: "html", url: "/tech/html-5-svgrepo-com.svg", width: 30, height: 30 },
  { icon: "css", url: "/tech/css-3-svgrepo-com.svg", width: 30, height: 30 },
  {
    icon: "javascript",
    url: "/tech/javascript-logo-svgrepo-com.svg",
    width: 25,
    height: 25,
  },
  {
    icon: "node-js",
    url: "/tech/node-js-svgrepo-com.svg",
    width: 30,
    height: 30,
  },
  { icon: "redux", url: "/tech/redux-svgrepo-com.svg", width: 30, height: 30 },
  {
    icon: "typescript",
    url: "/tech/typescript-icon-svgrepo-com.svg",
    width: 25,
    height: 25,
  },
  {
    icon: "tailwindcss",
    url: "/tech/tailwindcss-icon-svgrepo-com.svg",
    width: 30,
    height: 30,
  },
  {
    icon: "prisma",
    url: "/tech/prisma-svgrepo-com.svg",
    width: 30,
    height: 30,
  },
];

const SliderDesign = () => {
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div
      className="relative h-full overflow-hidden py-6  mx-auto"
      style={{ width: "100%" }}
    >
      <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white dark:before:from-[#0F172A] before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white  dark:after:from-[#0F172A] after:to-transparent after:filter after:blur-3"></div>

      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 15,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${100 / slides.length}%` }}
          >
            <div className="flex items-center justify-center h-full gap-4">
              <Image
                src={slide.url}
                alt="react"
                width={slide.width}
                height={slide.height}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SliderDesign;
