import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/tabs";
import React from "react";
import ArticleItem from "./article-item";
import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Article } from "./data/types";

function TabTriggerModified({
  children,
  id,
}: {
  children: string;
  id: string;
}) {
  return (
    <TabsTrigger
      value={id}
      className="py-3 border-b-2 border-b-gray-100 data-[state=active]:border-b-gold data-[state=active]:shadow-none data-[state=active]:bg-inherit rounded-none"
    >
      {children}
    </TabsTrigger>
  );
}

const tabData = [
  { id: "latest", label: "Latest" },
  { id: "react", label: "React" },
  { id: "frontend", label: "Frontend" },
  { id: "angular", label: "Angular" },
  { id: "javascript", label: "Javascript" },
  { id: "system-design", label: "System Design" },
  { id: "db", label: "Databases" },
  { id: "cloud", label: "Cloud" },
  { id: "dsa", label: "DSA" },
];

async function Articles() {
  const filenames = await fs.readdir(
    path.join(process.cwd(), "src/app/blog/markdown")
  );

  const articles = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/app/blog/markdown", filename),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<Article>({
        source: content,
        options: { parseFrontmatter: true },
      });
      return {
        ...frontmatter,
        id: filename.replace(".mdx", ""),
        filename,
      };
    })
  );

  return (
    <Tabs defaultValue="latest">
      <TabsList className="flex-wrap h-auto justify-center rounded-md bg-inherit p-0 justify-none">
        {tabData.map((tab) => (
          <TabTriggerModified key={tab.id} id={tab.id}>
            {tab.label}
          </TabTriggerModified>
        ))}
      </TabsList>
      <TabsContent value="latest">
        {articles.slice(0, 3).map((article) => (
          <ArticleItem data={article} key={article.id} />
        ))}
      </TabsContent>
      <TabsContent value="react">
        {articles
          .filter((f) => f.topic === "react")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="frontend">
        {articles
          .filter((f) => f.topic === "frontend")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="angular">
        {articles
          .filter((f) => f.topic === "angular")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="javascript">
        {articles
          .filter((f) => f.topic === "javascript")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="system-design">
        {articles
          .filter((f) => f.topic === "system-design")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="db">
        {articles
          .filter((f) => f.topic === "db")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="cloud">
        {articles
          .filter((f) => f.topic === "cloud")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="dsa">
        {articles
          .filter((f) => f.topic === "dsa")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
    </Tabs>
  );
}

export default Articles;
