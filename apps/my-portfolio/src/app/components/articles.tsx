import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/tabs";
import React from "react";
import ArticleItem from "./article-item";

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
        <TabsTrigger value="sql">Cloud</TabsTrigger>
        <TabsTrigger value="sql">DSA</TabsTrigger>
      </TabsList>
      <TabsContent value="latest">
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
      </TabsContent>
      <TabsContent value="react"></TabsContent>
    </Tabs>
  );
}

export default Articles;
