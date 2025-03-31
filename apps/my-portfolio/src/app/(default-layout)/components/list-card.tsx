import React from "react";
import { icons } from "./icons";

interface ListCardItems {
  heading: string;
  items: string[];
}


function ListCard({ heading, items }: ListCardItems) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <div className="font-[650] mb-3">{heading}</div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li className="flex justify-between items-center" key={item}>
            <div className="grow inline-flex mr-1 truncate items-center gap-3">
              {icons[item] || <span className="text-gold mr-2">—</span>}
              <a className="font-[650] text-sm truncate">{item}</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCard;
