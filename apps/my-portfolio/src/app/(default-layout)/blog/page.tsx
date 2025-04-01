
import Articles from "@/app/(default-layout)/components/articles";
import HobbyCard from "@/app/(default-layout)/components/hobby-card";
import JSBlitz from "@/app/(default-layout)/components/js-blitz";
import Promotion from "@/app/(default-layout)/components/promotions";
import SliderDesign from "@/app/(default-layout)/components/tech-ani";
import React from "react";

function Blog() {
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="grow">
        <div className="max-w-[700px]">
          <section>
            <h1 className="text-5xl font-[650] mb-12">My Blog</h1>
            <Articles />
          </section>
        </div>
      </div>
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <SliderDesign showTitle={true} />
          <JSBlitz />
          <Promotion />
          <HobbyCard />
        </div>
      </aside>
    </div>
  );
}

export default Blog;
