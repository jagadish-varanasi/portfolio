import Image from "next/image";
import React from "react";

function CodingProfile() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <div className="text-center mb-4">
        <div className="font-aspekta font-[650] mb-1">Coding Profiles!</div>
        <p className="text-sm text-muted-foreground text-slate-500 dark:text-slate-400">
          Platforms I practice at regular basis
        </p>
      </div>
      <div>
        <a
          className="flex items-center gap-x-4 p-3 hover:bg-primary/10 rounded-lg"
          href="https://leetcode.com/u/jagavara/"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="leetcode"
            className="w-9 h-9"
          >
            <path
              fill="#B3B1B0"
              d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"
            ></path>
            <path
              fill="#E7A41F"
              d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"
            ></path>
            <path
              fill="#070706"
              d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"
            ></path>
          </svg>
          <div>
            <h5 className="font-semibold">Leetcode</h5>
            <p className="text-sm dark:text-[#858585] text-[#717171]">DSA</p>
          </div>
        </a>
        <a
          className="flex items-center gap-x-4 p-3 hover:bg-primary/10 rounded-lg"
          href="https://bigfrontend.dev/user/jagadish30"
          target="_blank"
        >
          <Image src="/bfe.png" alt="bfe" width="36" height="36" />
          <div>
            <h5 className="font-semibold">BFD.dev</h5>
            <p className="text-sm dark:text-[#858585] text-[#717171]">
              Frontend
            </p>
          </div>
        </a>
        <a
          className="flex items-center gap-x-4 p-3 hover:bg-primary/10 rounded-lg"
          href="https://www.geeksforgeeks.org/user/jagadishvaranasi123/"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="160px"
            height="160px"
            className="w-9 h-9"
          >
            <path
              fill="#43a047"
              d="M29.035,24C29.014,23.671,29,23.339,29,23c0-6.08,2.86-10,7-10c3.411,0,6.33,2.662,7,7l2,0l0.001-9	L43,11c0,0-0.533,1.506-1,1.16c-1.899-1.066-3.723-1.132-6.024-1.132C30.176,11.028,25,16.26,25,22.92	c0,0.364,0.021,0.723,0.049,1.08h-2.099C22.979,23.643,23,23.284,23,22.92c0-6.66-5.176-11.892-10.976-11.892	c-2.301,0-4.125,0.065-6.024,1.132C5.533,12.506,5,11,5,11l-2.001,0L3,20l2,0c0.67-4.338,3.589-7,7-7c4.14,0,7,3.92,7,10	c0,0.339-0.014,0.671-0.035,1H0v2h1.009c1.083,0,1.977,0.861,1.999,1.943C3.046,29.789,3.224,32.006,4,33c1.269,1.625,3,3,8,3	c5.022,0,9.92-4.527,11-10h2c1.08,5.473,5.978,10,11,10c5,0,6.731-1.375,8-3c0.776-0.994,0.954-3.211,0.992-5.057	C45.014,26.861,45.909,26,46.991,26H48v-2H29.035z M11.477,33.73C9.872,33.73,7.322,33.724,7,32	c-0.109-0.583-0.091-2.527-0.057-4.046C6.968,26.867,7.855,26,8.943,26H19C18.206,30.781,15.015,33.73,11.477,33.73z M41,32	c-0.322,1.724-2.872,1.73-4.477,1.73c-3.537,0-6.729-2.949-7.523-7.73h10.057c1.088,0,1.975,0.867,2,1.954	C41.091,29.473,41.109,31.417,41,32z"
            />
          </svg>
          <div>
            <h5 className="font-semibold">Geeks for Geeks</h5>
            <p className="text-sm dark:text-[#858585] text-[#717171]">DSA</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default CodingProfile;
