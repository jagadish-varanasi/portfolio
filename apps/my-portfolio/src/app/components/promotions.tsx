import React from "react";

function Promotion() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <div className="text-center mb-8">
        <div className="font-aspekta font-[650] mb-1">
          Get frontend prep guide!
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Free guide, I curated on Frontend prep, based on my
          experiences.
        </p>
      </div>
      <form>
        <div className="mb-2">
          <label className="sr-only" htmlFor="newsletter">
            Your email…
          </label>
          <input
            id="newsletter"
            type="email"
            className="text-xs  bg-gray-100 py-2 px-4 w-full rounded-2xl focus:outline-none"
            placeholder="  Your email…"
          />
        </div>
        <button
          className="btn-sm w-full  text-slate-100 bg-yellow-500 hover:bg-yellow-600"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Promotion;
