import Header from "../../components/header";
import MdxLayout from "@/app/components/mdx-layout";
import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Article } from "@/app/components/data/types";
import remarkGfm from "remark-gfm";


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
  const data = await compileMDX<Article>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
  return (
    <>
      <Header image={`/${data.frontmatter.url}`} />
      <div className="flex items-center mb-1">
        <div className="text-xs text-slate-500 uppercase">
          <span className="text-yellow-500">—</span>
          <time dateTime="2024-01-16T07:00:00.000Z">
            {" "}
            {data.frontmatter.date}
          </time>{" "}
          <span className="text-slate-400 dark:text-slate-600">·</span>{" "}
          {data.frontmatter.readDuration} Read
        </div>
      </div>
      <MdxLayout>{data.content}</MdxLayout>
    </>
  );
}

export default Page;
