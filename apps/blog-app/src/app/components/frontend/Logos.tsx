export function Logos() {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Built using modern and open source tech.
      </h2>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center justify-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <div className="tracking-tight col-span-2 max-h-14 w-full lg:col-span-1 dark:text-white text-5xl font-bold text-center">
          NextJs
        </div>
        <div className="tracking-tight col-span-2 max-h-14 w-full lg:col-span-1 dark:text-white text-5xl font-bold text-center">
          Kinde
        </div>
        <div className="tracking-tight col-span-2 max-h-14 w-full lg:col-span-1 dark:text-white text-5xl font-bold text-center">
          Shadcn
        </div>
        <div className="tracking-tight col-span-2 max-h-14 w-full  lg:col-span-1 dark:text-white text-5xl font-bold text-center">
          Supabase
        </div>
        <div className="tracking-tight col-span-2 max-h-14 w-full  lg:col-span-1 dark:text-white text-5xl font-bold text-center">
          Tiptap
        </div>
      </div>
    </div>
  );
}
