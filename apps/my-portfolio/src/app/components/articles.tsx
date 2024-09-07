import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/tabs";
import React from "react";
import ArticleItem from "./article-item";
import { articles } from "./data/articles";

function Articles() {
  return (
    <Tabs defaultValue="latest">
      <TabsList className="w-full mt-2">
        <TabsTrigger value="latest">Latest</TabsTrigger>
        <TabsTrigger value="react">React</TabsTrigger>
        <TabsTrigger value="frontend">Frontend</TabsTrigger>
        <TabsTrigger value="angular">Angular</TabsTrigger>
        <TabsTrigger value="javascript">Javascript</TabsTrigger>
        <TabsTrigger value="system-design">System Design</TabsTrigger>
        <TabsTrigger value="sql">SQL</TabsTrigger>
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
          .filter((f) => f.tag === "React")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="frontend">
        {articles
          .filter((f) => f.tag === "Frontend")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="angular">
        {articles
          .filter((f) => f.tag === "Angular")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="javascript">
        {articles
          .filter((f) => f.tag === "JavaScript")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="system-design">
        {articles
          .filter((f) => f.tag === "System Design")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="sql">
        {articles
          .filter((f) => f.tag === "SQL")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="cloud">
        {articles
          .filter((f) => f.tag === "Cloud")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
      <TabsContent value="dsa">
        {articles
          .filter((f) => f.tag === "DSA")
          .map((article) => (
            <ArticleItem data={article} key={article.id} />
          ))}
      </TabsContent>
    </Tabs>
  );
}

export default Articles;
