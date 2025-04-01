"use client";
import Image from "next/image";
import React from "react";

function WorkExperience() {
  return (
    <ul className="space-y-8">
      <div className="relative group">
        <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
          <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
            <Image
              src={"/company.webp"}
              alt="home"
              layout="fill"
              objectFit="contain"
              style={{
                height: "100%",
                width: "100%",
                scale: 0.8,
              }}
              className="rounded-full dark:hidden"
            />
            <Image
              src={"/company-1.png"}
              alt="home"
              layout="fill"
              objectFit="contain"
              style={{
                height: "100%",
                width: "100%",
                scale: 0.8,
              }}
              className="rounded-full hidden dark:block"
            />
          </div>
          <div className="pl-20 space-y-1">
            <div className="text-xs text-slate-500 uppercase">
              Mar. 2021
              <span className="text-slate-400 dark:text-slate-600">
                {" . "}
              </span>
              Present
            </div>
            <div className="font-[650] text-slate-800 dark:text-slate-100">
              HashedIn By Deloitte
            </div>
            <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
              3yrs 9 mos
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Tech stack: React, Javascript, Typescript, React Native, Angular
            </div>
            <div className="pt-8">
              <ul className="space-y-8">
                <div className="relative group">
                  <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[10px] before:-translate-x-1/2 before:translate-y-6">
                    <div className="absolute left-0 h-5 w-5 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full"></div>
                    <div className="pl-10 space-y-1">
                      <div className="text-xs text-slate-500 uppercase">
                        Apr. 2023
                        <span className="text-slate-400 dark:text-slate-600">
                          {" . "}
                        </span>
                        Present
                      </div>
                      <div className="font-[650] text-slate-800 dark:text-slate-100">
                        Software Engineer II
                      </div>
                  
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100"></div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        As a Software Engineer, I am part of the development
                        team for an application that leverages generative AI to
                        produce business-related documents such as Minutes of
                        Meetings (MOM) and User Stories. Additionally, I
                        contributed to the development of a cost optimization
                        tool for airline networks. My role primarily involved
                        frontend development using React and Redux, ensuring a
                        seamless and efficient user experience. My
                        responsibilities included requirement gathering, task
                        estimation, development, design reviews, code reviews,
                        and conducting demos of developed features, followed by
                        a feedback cycle to ensure continuous improvement.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[10px] before:-translate-x-1/2 before:translate-y-6">
                    <div className="absolute left-0 h-5 w-5 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full"></div>
                    <div className="pl-10 space-y-1">
                      <div className="text-xs text-slate-500 uppercase">
                        Jul. 2021
                        <span className="text-slate-400 dark:text-slate-600">
                          {" . "}
                        </span>
                        May. 2023
                      </div>
                      <div className="font-[650] text-slate-800 dark:text-slate-100">
                        Software Engineer-I
                      </div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100"></div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <p>
                          Successfully developed and enhanced frontend
                          applications for healthcare domain app, internal
                          employee engagement tools, and client&apos;s employee
                          learning platforms(web/mobile). Utilized React and
                          Angular frameworks with Redux for efficient state
                          management.
                        </p>
                        <p>
                          Implemented real-time features, modular architecture,
                          and CI/CD pipelines for seamless deployment and
                          testing. Demonstrated strong skills in optimizing code
                          quality, performance, and maintaining comprehensive
                          documentation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[10px] before:-translate-x-1/2 before:translate-y-6 before:group-last-of-type:hidden">
                    <div className="absolute left-0 h-5 w-5 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full"></div>
                    <div className="pl-10 space-y-1">
                      <div className="text-xs text-slate-500 uppercase">
                        Mar. 2021
                        <span className="text-slate-400 dark:text-slate-600">
                          {" . "}
                        </span>
                        Jun. 2021
                      </div>
                      <div className="font-[650] text-slate-800 dark:text-slate-100">
                        Intern
                      </div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100"></div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        As a software engineer intern, I completed an intensive
                        bootcamp HashedIn University (HU), which involved
                        rigorous training in HTML/CSS/JavaScript, Angular, Java,
                        Google Cloud Platform (GCP), and data science.
                        Demonstrating exceptional learning agility, all
                        assignments were completed in a short span, and
                        significant contributions were made to a product month.
                        This comprehensive training and practical experience
                        have equipped me with a robust skill set, making me a
                        valuable asset to any software development team.
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ul>
  );
}

export default WorkExperience;
