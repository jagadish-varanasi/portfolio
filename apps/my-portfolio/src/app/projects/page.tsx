import React from "react";
import ProjectItem from "../components/project-item";
import HobbyCard from "../components/hobby.-card";
import Promotion from "../components/promotions";
import CodingProfile from "../components/coding-profile";

function Projects() {
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="grow">
        <div className="max-w-[700px]">
          <h1 className="mb-12 text-5xl font-[600]">
            Some cool stuff I've built
          </h1>
          <section>
            <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
              <ProjectItem />
              <ProjectItem />
              <ProjectItem />
            </div>
          </section>
        </div>
      </div>
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <Promotion />
          <HobbyCard />
          <CodingProfile />
        </div>
      </aside>
    </div>
  );
}

export default Projects;
