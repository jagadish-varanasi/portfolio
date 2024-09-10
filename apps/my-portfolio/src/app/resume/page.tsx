import React from "react";
import Tech from "../components/tech";
import Tools from "../components/tools";
import Lang from "../components/lang";
import Image from "next/image";
import WorkExperience from "../components/work-experience";

function Resume() {
  return (
    <div>
      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
        <div className="grow">
          <div className="max-w-[700px]">
            <section>
              <h1 className="h1 text-5xl mb-12">My resume</h1>
              <div className="text-slate-500 dark:text-slate-400 space-y-12">
                <div className="space-y-8">
                  <h2 className="text-2xl font-[650] text-slate-800 dark:text-slate-100">
                    Work Experience
                  </h2>
                  <WorkExperience />
                </div>
                <div className="space-y-8">
                  <h2 className="text-2xl font-[650] text-slate-800 dark:text-slate-100">
                    Education
                  </h2>
                  <ul className="space-y-8">
                    <div className="relative group">
                      <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            src={"/nmit.webp"}
                            alt="home"
                            layout="fill"
                            objectFit="contain"
                            style={{
                              height: "100%",
                              width: "100%",
                              scale: 0.6,
                            }}
                            className="rounded-full"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Sept. 2017
                            <span className="text-slate-400 dark:text-slate-600">
                              {" . "}
                            </span>
                            May. 2021
                          </div>
                          <div className="font-[650] text-slate-800 dark:text-slate-100">
                            Nitte Meenakshi Institute of Technology, Bengaluru
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            Bachelor of Engineering (Comp sci.)
                          </div>
                          <div className="text-xs font-light text-slate-800 dark:text-slate-100">
                            Grade: 9.4
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Throughout my years at NMIT, I immersed myself in a
                            dynamic learning environment, surrounded by
                            dedicated faculty and talented peers. NMIT focuses
                            on entrepreneurship and leadership which is
                            something that I really like.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            src={"/bpsc.png"}
                            alt="home"
                            layout="fill"
                            objectFit="contain"
                            style={{
                              height: "100%",
                              width: "100%",
                              scale: 0.7,
                            }}
                            className="rounded-full"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Mar. 2015
                            <span className="text-slate-400 dark:text-slate-600">
                              {" . "}
                            </span>
                            Aug. 2017
                          </div>
                          <div className="font-[650] text-slate-800 dark:text-slate-100">
                            BPSC PU College
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            PCMC.
                          </div>
                          <div className="text-xs font-light text-slate-800 dark:text-slate-100">
                            Grade: 90.4%
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Completed by pre-university in science combination
                            of Physiscs, Chemisty, Mathand Computer science.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            src={"/skem.avif"}
                            alt="home"
                            layout="fill"
                            objectFit="contain"
                            style={{
                              height: "100%",
                              width: "100%",
                              scale: 0.9,
                            }}
                            className="rounded-full"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Mar. 2005
                            <span className="text-slate-400 dark:text-slate-600">
                              {" . "}
                            </span>
                            Aug. 2015
                          </div>
                          <div className="font-[650] text-slate-800 dark:text-slate-100">
                            Shantinikethan
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            Schooling
                          </div>
                          <div className="text-xs font-light text-slate-800 dark:text-slate-100">
                            Grade: 85.4%
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Completed by Schooling. Been part of many art events
                            representing school.
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
                <div className="space-y-8">
                  <h2 className="text-2xl font-[650] text-slate-800 dark:text-slate-100">
                    Others
                  </h2>
                  <ul className="space-y-8">
                    <div className="relative group">
                      <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            src={"/gcp_badge.png"}
                            alt="home"
                            layout="fill"
                            style={{ height: "100%", width: "100%" }}
                            className="rounded-full shadow-lg"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Oct. 2021
                            <span className="text-slate-400 dark:text-slate-600">
                              {" . "}
                            </span>
                            Oct. 2023
                          </div>
                          <div className="font-[650] text-slate-800 dark:text-slate-100">
                            Google Cloud Certified Associate.
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            GCP
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Successfully achieved the GCP Associate Cloud
                            Engineer certification, demonstrating proficiency in
                            deploying applications, monitoring operations, and
                            managing enterprise solutions using Google Cloud
                            technologies.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="flex items-start before:absolute before:left-0 before:h-full before:w-px before:bg-slate-200 before:dark:bg-slate-800 before:self-start before:ml-[28px] before:-translate-x-1/2 before:translate-y-8 before:group-last-of-type:hidden">
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            src={"/coursera.png"}
                            alt="home"
                            layout="fill"
                            style={{ height: "100%", width: "100%" }}
                            className="rounded-full shadow-lg"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Mar. 2020
                            <span className="text-slate-400 dark:text-slate-600">
                              {" . "}
                            </span>
                            Oct. 2020
                          </div>
                          <div className="font-[650] text-slate-800 dark:text-slate-100">
                            Machine Learning
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            Coursera
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Completed the Machine Learning course by Andrew Ng
                            on Coursera, gaining a comprehensive understanding
                            of key machine learning concepts and techniques.
                            Developed proficiency in supervised learning
                            algorithms such as linear regression, logistic
                            regression, neural networks, and support vector
                            machines, as well as unsupervised learning methods
                            including k-means clustering and principal component
                            analysis (PCA). Acquired hands-on experience with
                            Octave/Matlab for implementing machine learning
                            models and applied these techniques to practical
                            problems in anomaly detection, recommender systems,
                            and natural language processing.
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
        <aside className="md:w-[240px] lg:w-[300px] shrink-0">
          <div className="space-y-6">
            <Tech />
            <Tools />
            <Lang />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Resume;
