"use client";
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black  dark:prose-invert dark:prose-headings:text-white">
      {children}
    </div>
  );
}
