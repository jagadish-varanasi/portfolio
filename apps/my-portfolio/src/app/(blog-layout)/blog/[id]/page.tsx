import Header from "../components/header";

import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import TableOfContents from "../components/tableofcontent";
import MdxLayout from "@/app/(default-layout)/components/mdx-layout";
import { Article } from "@/app/(default-layout)/components/data/types";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const content = await fs.readFile(
    path.join(
      process.cwd(),
      "src/app/(blog-layout)/blog/markdown",
      `${params.id}.mdx`
    ),
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
    path.join(
      process.cwd(),
      "src/app/(blog-layout)/blog/markdown",
      `${params.id}.mdx`
    ),
    "utf-8"
  );

  const data = await compileMDX<Article>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behaviour: "append",
              properties: {
                ariaHidden: true,
                tabIndex: -1,
                className: "hash-link",
              },
            },
          ],
        ],
      },
    },
  });


  return (
    <>
      <aside className="hidden md:block md:w-[240px] lg:w-[300px] shrink-0 order-last">
        <TableOfContents content={content} />
      </aside>
      <div className="grow">
        <div className="max-w-[700px] pb-40">
          <Header image={data.frontmatter.url || ""} />
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
        </div>
      </div>
    </>
  );
}

export default Page;
