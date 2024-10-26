import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "@repo/ui/components/button";


const meta = {
  title: "Design/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
  argTypes: {
    variant: {
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "gold",
        "destructive",
        "link",
      ],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
};

export const Gold: Story = {
  args: {
    variant: "gold",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
  },
};
