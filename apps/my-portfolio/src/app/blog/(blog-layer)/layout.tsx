"use client";
import CodingProfile from "@/app/components/coding-profile";
import HobbyCard from "@/app/components/hobby.-card";
import { motion, useScroll } from "framer-motion";
import Promotion from "@/app/components/promotions";
import React from "react";
import SliderDesign from "@/app/components/tech-ani";

function BlogDetails({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { scrollYProgress } = useScroll();
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="grow">
        <div className="max-w-[700px]">{children}</div>
      </div>
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <SliderDesign />
          <Promotion />
          <HobbyCard />
          <CodingProfile />
        </div>
      </aside>
    </div>
  );
}

export default BlogDetails;
