import React from "react";

function Lang() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <div className="font-[650] mb-3">Languages</div>
      <ul className="space-y-3">
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1.5 truncate">
            <span className="font-[650] text-sm truncate">
              English
            </span>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1.5 truncate">
            <span className="font-[650] text-sm truncate">Kannada</span>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1.5 truncate">
            <span className="font-[650] text-sm truncate">
              Hindi
            </span>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <div className="grow inline-flex mr-1.5 truncate">
            <span className="font-[650] text-sm truncate">Telugu</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Lang;
