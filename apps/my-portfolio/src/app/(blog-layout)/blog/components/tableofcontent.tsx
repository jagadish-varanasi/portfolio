"use client";
import { cn } from "@repo/ui/lib/utils";
import { ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

function TableOfContents({ content }: any) {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  const getIndentation = (level: number) => {
    return (level - 1) * 16; // 16px indentation per level
  };

  useEffect(() => {
    // Extract headings from the MDX content
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const extractedHeadings = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1], 10),
    }));
    setHeadings(extractedHeadings);
  }, [content]);

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -80% 0%",
        threshold: 1.0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    console.log(headings, "HEAD");

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: any, id: string) => {
    e.preventDefault();
    console.log(id);

    console.log(document.getElementById(id.trim()), "docu");
    console.log(id.trim() === "how-di-works-in-angular");
    console.log(id.length, "how-di-works-in-angular".length);
    console.log(document.getElementById("how-di-works-in-angular"), "docu");
    document.getElementById(id.trim())?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="sticky top-8">
      <div className="rounded-lg p-4">
        <p className="font-semibold text-md text-foreground mb-4">
          On this page
        </p>
        <nav className="relative">
          <ul className="space-y-3">
            {headings.map(({ id, text, level }, index) => (
              <li
                key={id + index}
                style={{ paddingLeft: `${getIndentation(level)}px` }}
                className={cn(
                  "flex items-start transition-all duration-200 ease-in-out",
                  level === 1 ? "mt-2" : "mt-1"
                )}
              >
                <ChevronRight
                  className={cn(
                    "mr-1 h-4 w-4 mt-1 flex-shrink-0 transition-colors",
                    activeId === id
                      ? "text-foreground"
                      : "text-muted-foreground",
                    level === 1 ? "h-5 w-5" : "h-4 w-4"
                  )}
                />
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    handleClick(e, id);
                  }}
                  className={cn(
                    "transition-colors leading-tight",
                    activeId === id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground",
                    level === 1
                      ? "text-base font-medium"
                      : level === 2
                        ? "text-sm font-medium"
                        : "text-sm font-normal"
                  )}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TableOfContents;
