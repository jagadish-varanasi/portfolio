import type { Meta, StoryObj } from "@storybook/react";
import icon from "./assets/noteIt.svg";
import ProjectItem from "../../../my-portfolio/src/app/components/project-item";
const project = {
  id: "1",
  title: "NoteIt",
  description:
    "Streamline your note-taking experience while keeping your data secure on your local device. With the power of AI",
  icon: icon,
  url: "https://google.com",
};

// type Project = typeof project;

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  url?: string;
}

const meta = {
  title: "Design/ProjectItem",
  component: ProjectItem,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    data: {
      id: { options: ["1", "2"], control: { type: "radio" } },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoteIt: Story = {
  args: {
    data: project,
  },
  render: ({ data }: { data: Project }) => (
    <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
      <ProjectItem data={data} />
    </div>
  ),
};
