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
      <TabsList className="w-full mt-2">
        <TabsTrigger value="latest">Latest</TabsTrigger>
        <TabsTrigger value="react">React</TabsTrigger>
        <TabsTrigger value="frontend">Frontend</TabsTrigger>
        <TabsTrigger value="angular">Angular</TabsTrigger>
        <TabsTrigger value="javascript">Javascript</TabsTrigger>
        <TabsTrigger value="system-design">System Design</TabsTrigger>
        <TabsTrigger value="db">Databases</TabsTrigger>
        <TabsTrigger value="cloud">Cloud</TabsTrigger>
        <TabsTrigger value="dsa">DSA</TabsTrigger>
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
