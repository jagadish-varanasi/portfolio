"use client";
import React from "react";
import SliderDesign from "./tech-ani";
import { PlaceholdersAndVanishInput } from "@repo/ui/components/placeholders-and-vanish-input";
import { Button } from "@repo/ui/components/button";

function Promotion() {
  const placeholders = [
    "Your email..",
    "Must Learn HTML tags and usage..",
    "Must know JS concepts..",
    "Your email..",
    "Top 5 design practices..",
    "CSS Pro tips..",
    "React Pro dev..",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
        <div className="text-center mb-8">
          <div className="font-aspekta font-[650] mb-1">
            Get frontend prep guide!
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Free guide, I curated on Frontend prep, based on my experiences.
          </p>
        </div>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
          renderSubmitButton={() => {
            return (
              <Button
                className="btn-sm w-full mt-2 h-8"
                type="submit"
                variant="gold"
              >
                Subscribe
              </Button>
            );
          }}
        />
      </div>
    </>
  );
}

export default Promotion;
