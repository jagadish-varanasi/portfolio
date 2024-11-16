import type { Meta, StoryObj } from "@storybook/react";
import ArticleItem from "../../../my-portfolio/src/app/components/article-item";
import icon from "./assets/react.svg";

const article = {
  id: "getting-started",
  date: "Apr 1, 2024",
  readDuration: "6 Min",
  title: "Getting Started with React",
  description:
    "An introductory guide to building web applications using React.",
  topic: "React",
  url: icon,
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
  title: "Design/ArticleItem",
  component: ArticleItem,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    data: {
      id: { options: ["1", "2"], control: { type: "radio" } },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArticleItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoteIt: Story = {
  args: {
    data: article,
  },
  render: ({ data }: { data: Article }) => (
    <div className="w-[800px]">
      <ArticleItem data={data} />
    </div>
  ),
};
