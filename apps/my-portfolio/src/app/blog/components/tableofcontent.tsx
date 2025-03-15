"use client";
import { cn } from "@repo/ui/lib/utils";
import { ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

function TableOfContents({ content }: any) {
  console.log(content, "CON");
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  const getIndentation = (level: number) => {
    return (level - 1) * 16; // 16px indentation per level
  };

  useEffect(() => {
    // Extract headings from the MDX content
    const lines = content.split("\n");
    const headingsList = lines
      .filter((line: any) => line.startsWith("#"))
      .map((line: any) => {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s+/, "").replaceAll("**", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return { id, text, level };
      });

    setHeadings(headingsList);
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

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="sticky top-40">
      <div className="rounded-lg bg-card p-4">
        <p className="font-semibold text-md text-foreground mb-4">
          On this page
        </p>
        <nav className="relative">
          <ul className="space-y-3">
            {headings.map(({ id, text, level }) => (
              <li
                key={id}
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
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
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
