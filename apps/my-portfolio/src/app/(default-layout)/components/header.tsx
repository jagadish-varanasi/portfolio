"use client";
import React, { useState, useEffect } from "react";
import useTheme from "../hooks/use-theme";
import { Button } from "@repo/ui/components/moving-border";
import ThemeToggle from "./theme-toggle";

function Header() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between h-16 before:block w-full">
        <div className="grow flex justify-between md:justify-end space-x-4">
          <ThemeToggle />
          <div>
            <a
              href={process.env.RESUME_DOWNLOAD_LINK}
              download={process.env.RESUME_FILE_NAME}
            >
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                Resume
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
