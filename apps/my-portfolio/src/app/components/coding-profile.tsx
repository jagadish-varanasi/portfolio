import Image from "next/image";
import React from "react";

function CodingProfile() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <div className="text-center mb-4">
        <div className="font-aspekta font-[650] mb-1">Coding Profiles!</div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          I practice, problem solving in these platforms.
        </p>
      </div>
      <div className="flex gap-5">
        <Image src="/leetcode.png" alt="leetcode" width="25" height="20" />
        <Image src="/bfe.png" alt="bfe" width="30" height="30" />
      </div>
    </div>
  );
}

export default CodingProfile;
