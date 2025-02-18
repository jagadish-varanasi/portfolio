"use client";
import React from "react";
import Navbar from "./components/navbar";
import TemplateGallery from "./components/template-gallery";
import DocumentsTable from "./components/documents-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParam } from "@/hooks/use-search-params";

const fetchDocuments = async ({
  pageParam = "",
  queryKey,
}: {
  pageParam: string;
  queryKey: (string | number)[];
}): Promise<Page> => {
  const [_, search, take] = queryKey as string[];
  const params = new URLSearchParams({
    searchQuery: search,
    cursor: pageParam,
    take,
  });
  const response = await fetch(`/api/v1/documents?${params.toString()}`);
  const data = await response.json();
  return data;
};

type Document = {
  id: string;
  title: string | null;
  initialContent: string | null;
  projectId: string;
  roomId: string | null;
  ownerId: string;
};

type Page = {
  documents: Document[];
  nextCursor: string | null;
};

function Document({
  params,
}: {
  params: { documentId: string; projectId: string };
}) {
  const [search] = useSearchParam();
  const take = 2;

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["documents", search, take],
    queryFn: fetchDocuments,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex top-0 left-0 right-0 z-10 h-14 bg-white p-4">
        <Navbar />
      </div>
      <div>
        <TemplateGallery projectId={params.projectId} />
        <DocumentsTable
          documents={data?.pages.map((page) => page.documents).flat()}
          loadMore={fetchNextPage}
          isLoading={isFetching}
          hasNext={hasNextPage}
        />
      </div>
    </div>
  );
}

export default Document;
