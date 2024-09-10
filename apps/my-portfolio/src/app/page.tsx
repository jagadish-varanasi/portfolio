import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./components/socials";
import Articles from "./components/articles";
import ProjectItem from "./components/project-item";
import HobbyCard from "./components/hobby.-card";
import Promotion from "./components/promotions";
import CodingProfile from "./components/coding-profile";
import { projects } from "./components/data/projects";

function Home() {
  return (
    <>
      <section className="flex">
        <div className="max-w-[700px]">
          <div className="pt-8 pb-10">
            <div className="h-[270px] relative mb-8">
              <Image
                src={"/home.jfif"}
                alt="home"
                layout="fill"
                style={{ height: "100%", width: "100%" }}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="mb-2 text-xl font-aspekta">Hi, I'm Jagadish</div>
            <h1 className="h1 mb-5 text-4xl md:text-5xl font-aspekta font-[650]">
              I craft{" "}
              <span className="inline-flex relative text-green-600 before:absolute before:inset-0 before:bg-green-200 dark:before:bg-green-500 before:opacity-10 before:-z-10 before:-rotate-1 before:translate-y-1/4">
                {/* full-stack */} products
              </span>{" "}
              that people <span className="text-pink-400"> love.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-aspekta">
              Software Engineer, working at HashedIn by Deloitte. I play read,
              write and travel for fun.
            </p>
          </div>
        </div>
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
