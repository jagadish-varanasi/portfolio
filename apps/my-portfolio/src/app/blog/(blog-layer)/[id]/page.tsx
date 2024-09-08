import Header from "../../components/header";
import MdxLayout from "@/app/components/mdx-layout";
import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/app/blog/markdown", `${params.id}.mdx`),
    "utf-8"
  );
  const { frontmatter } = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });
  return {
    title: frontmatter.title,
  };
}

async function Page({ params }: { params: { id: string } }) {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/app/blog/markdown", `${params.id}.mdx`),
    "utf-8"
  );
  const data = await compileMDX<{ title: string; description: string }>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });
  return (
    <>
      <Header image={"/tech/react-svgrepo-com.svg"} />
      <MdxLayout>{data.content}</MdxLayout>
    </>
  );
}

export default Page;
