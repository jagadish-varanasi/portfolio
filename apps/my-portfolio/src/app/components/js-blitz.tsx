import React from "react";
import { Card, CardContent } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import {
  ArrowRight,
  Code2,
  Zap,
  Terminal,
  TerminalIcon,
  MoveRightIcon,
} from "lucide-react";
import Link from "next/link";

function JSBlitz() {
  const JSBLITZURL = process.env.JSBLITZ || "";
  return (
    <Card className="hover:shadow-lg transition-shadow  dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-yellow-400 rounded-lg rotate-12"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 relative text-background transform -rotate-12"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-lg leading-none mb-1">
              <span>JS</span>
              <span className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-transparent bg-clip-text">
                Blitz
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Modern JavaScript Playground
            </div>
          </div>
        </div>
        <Link href={JSBLITZURL} target="_blank">
          <Button className="w-full h-8 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-background font-semibold">
            Try JSBlitz
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export const CodeJsX = () => {
  const codexURL = process.env.CODEX || "";
  return (
    <Card className="hover:shadow-lg transition-shadow  dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-8 h-8">
            <TerminalIcon className="h-8 w-8 text-white bg-indigo-600 rounded-md dark:bg-white dark:text-indigo-600" />
          </div>
          <div>
            <div className="font-bold text-lg leading-none">
              <span className="text-indigo-600 dark:text-white">CodeJS</span>
              <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
                X
              </span>
            </div>
            <Link
              href={codexURL}
              target="_blank"
              className="text-xs text-muted-foreground flex gap-1 items-center hover:underline cursor-pointer"
            >
              Machine coding in JS & JSX. <MoveRightIcon className="h-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const JSBlitzInfo = () => {
  const JSBLITZURL = process.env.JSBLITZ || "";
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group  dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1">
      <CardContent className="p-0">
        <div className="bg-yellow-400/10 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Start Coding</span>
            </div>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="font-mono text-sm bg-background/50 rounded-md p-2 overflow-hidden">
            <span className="text-muted-foreground">
              {"// Your code journey begins here"}
            </span>
            <div className="text-yellow-500">
              console.log(
              <span className="text-green-500">
                &quot;Hello, JSBlitz!&quot;
              </span>
              );
            </div>
          </div>
        </div>
        <div className="p-5 pt-3">
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <Terminal className="w-4 h-4" />
            <span>Ready to practice JS in local editor?</span>
          </div>
          <Link href={JSBLITZURL} target="_blank">
            <Button className="w-full bg-gradient-to-r h-8 rounded-2xl from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-background font-semibold group-hover:shadow-md transition-all">
              Launch Editor
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default JSBlitz;
