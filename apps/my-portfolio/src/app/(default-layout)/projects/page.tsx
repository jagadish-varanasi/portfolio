import React from "react";
import ProjectItem from "../components/project-item";
import HobbyCard from "../components/hobby-card";
import Promotion from "../components/promotions";
import CodingProfile from "../components/coding-profile";
import { projects } from "../components/data/projects";
import { ExpandableCards } from "./components/expandable-cards";
import SliderDesign from "../components/tech-ani";
import JSBlitz from "../components/js-blitz";

function Projects() {
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="grow">
        <div className="max-w-[700px]">
          <h1 className="mb-12 text-5xl font-[600]">
            Some cool stuff I&apos;ve built
          </h1>
          <section>
            <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
              {projects.map((project) => (
                <ProjectItem data={project} key={project.id} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <SliderDesign showTitle={true} />
          <JSBlitz />
          <Promotion />
          <HobbyCard />
          <CodingProfile />
        </div>
      </aside>
    </div>
  );
}

export default Projects;
