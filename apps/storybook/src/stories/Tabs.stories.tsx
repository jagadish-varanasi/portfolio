import type { Meta, StoryObj } from "@storybook/react";
import ArticleItem from "../../../my-portfolio/src/app/components/article-item";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

const article1 = {
  id: "getting-started",
  date: "Apr 1, 2024",
  readDuration: "6 Min",
  title: "Getting Started with React",
  description:
    "An introductory guide to building web applications using React.",
  topic: "React",
};

const article2 = {
  id: "2",
  date: "Apr 2, 2024",
  readDuration: "7 Min",
  title: "Understanding Angular Directives",
  description:
    "A comprehensive look at Angular directives and how to use them.",
  topic: "Angular",
};

// type Project = typeof project;

export interface Article {
  id: string;
  title: string;
  description: string;
  topic: string;
  readDuration: string;
  date: string;
  url?: string;
}

const meta = {
  title: "Design/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ArticleTabs: Story = {
  render: () => (
      <Tabs defaultValue="latest">
        <TabsList className="w-full mt-2">
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
        </TabsList>
        <TabsContent value="latest">
          <ArticleItem data={article1} key={article1.id} />
        </TabsContent>
        <TabsContent value="react">
          <ArticleItem data={article2} key={article2.id} />
        </TabsContent>
      </Tabs>
  ),
};
