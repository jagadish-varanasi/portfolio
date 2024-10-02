"use client";

import Header from "@/app/components/header";
import Promotion from "@/app/components/promotions";
import { AuroraBackground } from "@repo/ui/components/aurora-background";
import { TextGenerateEffect } from "@repo/ui/components/text-generate-effect";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
const BIO =
  "Software Engineer, working at HashedIn by Deloitte. I play read, write and travel for fun. Expertise in Javascript and React.";

export function HeroCard() {
  return (
    <div className="max-w-[700px]">
      <div className="pt-8 pb-10">
        <AuroraBackground>
          <div className="h-[240px] relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
              <div className="text-3xl md:text-2xl font-bold text-yellow-500 dark:text-white text-center ">
                Think Design Build Repeat.
              </div>
              {/* <div className="font-extralight text-base md:text-xl dark:text-neutral-200 py-4">
                    .
                  </div> */}
            </motion.div>
          </div>
        </AuroraBackground>
        <div className="mt-4">
          <div className="mb-2 text-xl font-aspekta">Hi, I'm Jagadish</div>
          <h1 className="h1 mb-5 text-4xl md:text-5xl font-aspekta font-[650]">
            I craft{" "}
            <span className="inline-flex relative text-green-600 before:absolute before:inset-0 before:bg-green-200 dark:before:bg-green-500 before:opacity-10 before:-z-10 before:-rotate-1 before:translate-y-1/4">
              {/* full-stack */} products
            </span>{" "}
            that people <span className="text-pink-400"> love.</span>
          </h1>
          <TextGenerateEffect
            className="text-lg text-slate-500 dark:text-slate-400 font-aspekta"
            words={BIO}
          />
        </div>
      </div>
    </div>
  );
}
