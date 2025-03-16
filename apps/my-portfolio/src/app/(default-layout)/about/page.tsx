import React from "react";
import Promotion from "../components/promotions";
import HobbyCard from "../components/hobby-card";
import WorkExperience from "../components/work-experience";
import { JSBlitzInfo } from "../components/js-blitz";
import CodingProfile from "../components/coding-profile";

function About() {
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="grow">
        <div className="max-w-[700px]">
          <section>
            <h1 className="text-5xl mb-5">
              {"Hi. I'm "}
              <span className="inline-flex relative text-yellow-500 before:absolute before:inset-0 before:bg-yellow-200 dark:before:bg-yellow-500 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4">
                {"Jagadish V"}
              </span>
              🤟
            </h1>
            <div className="text-slate-500 dark:text-slate-400 space-y-8 mt-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-[650] text-slate-800 dark:text-slate-100">
                  Short Bio
                </h2>
                <p>
                  I&apos;m a product maker (... and a professional software
                  engineer) currently working at HashedIn by Deloitte in
                  Bengaluru. With ~3 years of industry experience, mostly
                  solving problem statements related to frontend, Web
                  Performance, Server Driven UI and Web Security and Animations.
                  Bridging the gap between engineering and design. I&apos;m
                  passionate about building products that help people and make a
                  difference in the world.{" "}
                  <a
                    className="text-yellow-500"
                    href="https://github.com/dhravya"
                  ></a>{" "}
                  I also love educating others about technology and programming,
                  which is why I{"  "}
                  <a className="text-yellow-500" href="/blog">
                    write blogs
                  </a>{" "}
                  in my free time. <br />I mainly write code in the{" "}
                  <a href="https://create.t3.gg" className="text-yellow-500">
                    Javascript
                  </a>
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-[650]  text-slate-800 dark:text-slate-100">
                  Expertise
                </h2>
                <p>
                  As a seasoned Frontend Developer with extensive experience in
                  <span className="text-yellow-500">
                    {" "}
                    React, JavaScript, React Native, Next.js, Angular and
                    TypeScript
                  </span>
                  , I bring a robust skill set and a proven track record of
                  delivering high-quality, user-centric{" "}
                  <span className="text-yellow-500">web and mobile </span>
                  applications. My expertise lies in developing responsive,
                  scalable, and maintainable code, leveraging modern frameworks
                  and libraries to enhance user experience and performance. With
                  a deep understanding of state management, component lifecycle,
                  and asynchronous programming, I excel in building{" "}
                  <span className="text-yellow-500">
                    complex, interactive interfaces.
                  </span>
                </p>
                <p>
                  Additionally, I possess a solid understanding of backend
                  systems, particularly with{" "}
                  <span className="text-yellow-500">Node.js</span>, allowing me
                  to develop and integrate efficient server-side logic. My
                  knowledge extends to cloud services in{" "}
                  <span className="text-yellow-500">
                    Google Cloud Platform{" "}
                  </span>
                  (GCP), where I have experience deploying, managing, and
                  optimizing applications for scalability and performance.
                </p>
                <p>
                  I am passionate about collaborating with like-minded
                  professionals to innovate and build impactful products. I
                  thrive in cross-functional team environments, implementing
                  best practices, and continuously optimizing code for better
                  performance and usability.
                </p>
              </div>
              <div className="space-y-8">
                <h2 className="text-2xl font-[650] text-slate-800 dark:text-slate-100">
                  Work Experience
                </h2>
                <WorkExperience />
              </div>
              <div className="space-y-4">
                <h2
                  id="lets-connect"
                  className="text-2xl font-[650]  text-slate-800 dark:text-slate-100"
                >
                  Let&apos;s Connect
                </h2>
                <p>
                  I&apos;m excited to connect via{" "}
                  <a
                    className="font-medium text-yellow-500 hover:underline"
                    href="mailto:hi@dhravya.dev"
                  >
                    email (jagadishvaranasi@gmail.com)
                  </a>{" "}
                  and{" "}
                  <a
                    className="font-medium text-yellow-500 hover:underline"
                    href="https://www.linkedin.com/in/jagadish-varanasi/"
                  >
                    LinkedIn
                  </a>{" "}
                  to chat about projects and ideas. Whether you have a concept
                  in mind or are looking for freelance expertise, let&apos;s
                  chat about how we can work together to turn great ideas into
                  successful realities.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <Promotion />
          <JSBlitzInfo />
          <HobbyCard />
          <CodingProfile />
        </div>
      </aside>
    </div>
  );
}

export default About;
