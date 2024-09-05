import React from "react";
import Promotion from "../components/promotions";
import HobbyCard from "../components/hobby.-card";

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
                  I'm a product maker (... and full stack developer) currently
                  based in Arizona, USA. I'm passionate about building products
                  that help people and make a difference in the world. I'm also
                  a big fan of open source software - which is why{" "}
                  <a
                    className="text-yellow-500"
                    href="https://github.com/dhravya"
                  >
                    almost everything I build is open source!
                  </a>{" "}
                  I also love educating others about technology and programming,
                  which is why I'm a{" "}
                  <a
                    className="text-yellow-500"
                    href="https://instagram.com/dhravya.dev"
                  >
                    content creator
                  </a>{" "}
                  and{" "}
                  <a className="text-yellow-500" href="/blog">
                    write blogs
                  </a>{" "}
                  in my free time. <br />I mainly write code in the{" "}
                  <a href="https://create.t3.gg" className="text-yellow-500">
                    T3 Stack
                  </a>
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-[650]  text-slate-800 dark:text-slate-100">
                  Career
                </h2>
                <p>
                  I sold my first venture,{" "}
                  <a
                    className="text-yellow-500"
                    href="https://epikhost.dhravya.dev/"
                  >
                    Epikhost
                  </a>
                  , at an age of 16. And then went on to build and{" "}
                  <a
                    href="https://x.com/DhravyaShah/status/1622132126354386944?s=20"
                    className="text-yellow-500"
                  >
                    fail a lot of times.
                  </a>{" "}
                  I also worked as a freelancer, creating and selling discord
                  bots and landing pages. Then, I went on to work as an app
                  developer for Commnete, a startup based in Mumbai, India.
                </p>
                <p>
                  My second exit was{" "}
                  <a className="text-yellow-500" href="https://tweets.beauty">
                    Tweets.beauty
                  </a>
                  , a tool to beautify tweets and other web content. I sold it
                  to{" "}
                  <a className="text-yellow-500" href="https://hypefury.com">
                    Hypefury
                  </a>{" "}
                  in 2023, and I got an opportunity to work with them as a full
                  stack developer.
                </p>
                <p>
                  I've won several hackathons as well, like{" "}
                  <a className="text-yellow-500" href="https://calhacks.io">
                    Calhacks, by UC Berkeley
                  </a>
                  , which was the biggest college hackathon of the time, and{" "}
                  <a className="text-yellow-500" href="https://sunhacks.io">
                    Sunhacks, by ASU
                  </a>
                </p>
              </div>
              <div className="space-y-8">
                <h2 className="text-2xl font-[650] text-slate-800 dark:text-slate-100">
                  Work Experience
                </h2>
                <ul className="space-y-8">
                  <div className="relative group">
                    <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                      <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full"></div>
                      <div className="pl-20 space-y-1">
                        <div className="text-xs text-slate-500 uppercase">
                          Mar. 2023
                          <span className="text-slate-400 dark:text-slate-600">
                            {" . "}
                          </span>
                          Aug. 2023
                        </div>
                        <div className="font-[650] text-slate-800 dark:text-slate-100">
                          Feature head and Full-Stack developer
                        </div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          Hypefury
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          As a Project Lead, my responsibility was to oversee
                          and maintain all the codebase of one of Hypefury's
                          core offerings. Typescript, Rust, Python were used in
                          the infrastructure. We utilized NextJS with the “T-3
                          stack” - ensuring developer productivity as well as a
                          bug-free typesafe codebase.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                      <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full"></div>
                      <div className="pl-20 space-y-1">
                        <div className="text-xs text-slate-500 uppercase">
                          Mar. 2023
                          <span className="text-slate-400 dark:text-slate-600">
                            {" . "}
                          </span>
                          Aug. 2023
                        </div>
                        <div className="font-[650] text-slate-800 dark:text-slate-100">
                          Feature head and Full-Stack developer
                        </div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          Hypefury
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          As a Project Lead, my responsibility was to oversee
                          and maintain all the codebase of one of Hypefury's
                          core offerings. Typescript, Rust, Python were used in
                          the infrastructure. We utilized NextJS with the “T-3
                          stack” - ensuring developer productivity as well as a
                          bug-free typesafe codebase.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                      <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full"></div>
                      <div className="pl-20 space-y-1">
                        <div className="text-xs text-slate-500 uppercase">
                          Mar. 2023
                          <span className="text-slate-400 dark:text-slate-600">
                            {" . "}
                          </span>
                          Aug. 2023
                        </div>
                        <div className="font-[650] text-slate-800 dark:text-slate-100">
                          Feature head and Full-Stack developer
                        </div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          Hypefury
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          As a Project Lead, my responsibility was to oversee
                          and maintain all the codebase of one of Hypefury's
                          core offerings. Typescript, Rust, Python were used in
                          the infrastructure. We utilized NextJS with the “T-3
                          stack” - ensuring developer productivity as well as a
                          bug-free typesafe codebase.
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
              <div className="space-y-4">
                <h2
                  id="lets-connect"
                  className="text-2xl font-[650]  text-slate-800 dark:text-slate-100"
                >
                  Let's Connect
                </h2>
                <p>
                  I'm excited to connect with others via{" "}
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
                  to chat about projects and ideas. Currently, I'm not taking on
                  freelance projects, but I am open to hearing about potential
                  opportunities, discussing them with you and then potentially
                  collaborating if it's a good fit.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <Promotion />
          <HobbyCard />
        </div>
      </aside>
    </div>
  );
}

export default About;
