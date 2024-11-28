import type { Meta, StoryObj } from "@storybook/react";
import ListCard from "../../../my-portfolio/src/app/components/list-card";

const techData = {
  heading: "Technical Skills",
  items: [
    "Javascript",
    "React",
    "Typescript",
    "T-3 Stack",
    "NextJS",
    "Angular",
    "Java",
    "React Native",
    "TailwindCSS",
    "Python",
    "Material UI",
    "Product Design",
    "UI/UX",
  ],
};

interface ListCardItems {
  heading: string;
  items: string[];
}
const meta = {
  title: "Design/ListCard",
  component: ListCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    heading: {
      description: "heading of the card",
      control: "text",
    },
    items: {
      description: "items of the card",
      control: "object",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TechCard: Story = {
  args: {
    ...techData,
  },
  render: ({ heading, items }: ListCardItems) => (
    <div className="w-[800px]">
      <ListCard heading={heading} items={items} />
    </div>
  ),
};
