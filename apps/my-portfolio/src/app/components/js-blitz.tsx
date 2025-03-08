"use client";
import React from "react";
import { Card, CardContent } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { ArrowRight, Code2, Zap, Terminal } from "lucide-react";

function JSBlitz() {
  return (
    <Card className="w-[300px] hover:shadow-lg transition-shadow  dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-8 h-8 shrink-0">
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
        <Button
          className="w-full h-8 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-background font-semibold"
          onClick={() => window.open(process.env.JSBLITZ, "_blank")}
        >
          Try JSBlitz
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

export const JSBlitzInfo = () => {
  return (
    <Card className="w-[300px] overflow-hidden hover:shadow-lg transition-all group  dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30">
      <CardContent className="p-0">
        <div className="bg-yellow-400/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Start Coding</span>
            </div>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="font-mono text-sm bg-background/50 rounded-md p-2 overflow-hidden">
            <span className="text-muted-foreground">
              // Your code journey begins here
            </span>
            <div className="text-yellow-500">
              console.log(
              <span className="text-green-500">"Hello, JSBlitz!"</span>);
            </div>
          </div>
        </div>
        <div className="p-4 pt-3">
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <Terminal className="w-4 h-4" />
            <span>Ready to transform your ideas into code?</span>
          </div>
          <Button
            className="w-full bg-gradient-to-r h-8 rounded-2xl from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-background font-semibold group-hover:shadow-md transition-all"
            onClick={() => window.open(process.env.JSBLITZ, "_blank")}
          >
            Launch Editor
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JSBlitz;
