import React from "react";

function Tools() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <div className=" font-[650] mb-3">Tools I know</div>
      <ul className="space-y-3">
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1 truncate">
            <span className="text-gold mr-2">—</span>{" "}
            <a className=" font-[650] text-sm truncate">Git</a>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1 truncate">
            <span className="text-gold mr-2">—</span>{" "}
            <a className=" font-[650] text-sm truncate">Github</a>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1 truncate">
            <span className="text-gold mr-2">—</span>{" "}
            <a className=" font-[650] text-sm truncate">Figma</a>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1 truncate">
            <span className="text-gold mr-2">—</span>{" "}
            <a className=" font-[650] text-sm truncate">VS Code</a>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1 truncate">
            <span className="text-gold mr-2">—</span>{" "}
            <a className=" font-[650] text-sm truncate">Expo</a>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1 truncate">
            <span className="text-gold mr-2">—</span>{" "}
            <a className=" font-[650] text-sm truncate">Azure</a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Tools;
