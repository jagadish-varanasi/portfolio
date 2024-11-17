import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./components/socials";
import Articles from "./components/articles";
import ProjectItem from "./components/project-item";
import HobbyCard from "./components/hobby-card";
import Promotion from "./components/promotions";
import CodingProfile from "./components/coding-profile";
import { projects } from "./components/data/projects";
import { TextGenerateEffect } from "@repo/ui/components/text-generate-effect";
import { HeroCard } from "./home/components/hero-card";
import SliderDesign from "./components/tech-ani";
const BIO =
  "Software Engineer, working at HashedIn by Deloitte. I play read, write and travel for fun.";
function Home() {
  return (
    <>
      <section className="flex">
        <HeroCard />
      </section>
      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pb-16 md:pb-20">
        <div className="grow">
          <div className="max-w-[700px]">
            <div className="space-y-10">
              <Socials />
              <p className="text-lg text-slate-900 dark:text-slate-300 mt-4">
                I also create content to inspire and help others get started
                with coding, and share my experiences as a engineer. Check it
                out here.
              </p>
              <section>
                <h2 className="text-xl font-[650] mb-3">Latest Articles</h2>
                <Articles />
              </section>
              <section>
                <h2 className="text-xl font-[650] mb-5">Latest Projects</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
                  {projects.map((project) => (
                    <ProjectItem data={project} key={project.id} />
                  ))}
                </div>
              </section>
            </div>
          </div>
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
    </>
  );
}

export default Home;
