"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { slides } from "./data/icons";

const SliderDesign = ({ showTitle = false }: { showTitle?: boolean }) => {
  const duplicatedSlides = [...slides, ...slides];
  const WIDTH = showTitle ? 350 : 100;

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
            style={{ width: `${WIDTH / slides.length}%` }}
          >
            <div className="flex items-center justify-center h-full gap-2">
              <Image
                src={slide.url}
                alt="react"
                width={slide.width}
                height={slide.height}
              />
              {showTitle && (
                <div className="flex flex-col">
                  <div className="text-xs font-bold">{slide.name}</div>
                  <div className="text-xs font-light">{slide.description}</div>
                  <div></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SliderDesign;
