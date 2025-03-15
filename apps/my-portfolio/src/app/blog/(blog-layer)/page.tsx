import Articles from "@/app/components/articles";
import HobbyCard from "@/app/components/hobby-card";
import JSBlitz from "@/app/components/js-blitz";
import Promotion from "@/app/components/promotions";
import SliderDesign from "@/app/components/tech-ani";
import React from "react";

function Blog() {
  return (
    <>
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
    </>
  );
}

export default Blog;
