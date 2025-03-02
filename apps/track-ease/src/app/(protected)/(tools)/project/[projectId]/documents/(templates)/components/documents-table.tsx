"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { LoaderIcon } from "lucide-react";
import DocumentRow from "./document-row";
import { Button } from "@repo/ui/components/button";

interface DocumentTableProps {
  documents:
    | {
        id: string;
        title: string | null;
        initialContent: string | null;
        projectId: string;
        roomId: string | null;
        ownerId: string;
      }[]
    | undefined;
  loadMore: () => void;
  isLoading: boolean;
  hasNext: boolean;
}

function DocumentsTable({
  documents,
  loadMore,
  isLoading,
  hasNext,
}: DocumentTableProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent border-none">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document?.id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className="flex items-center justify-center">
        {isLoading && documents?.length && (
          <div className="flex justify-center items-center h-24">
            <LoaderIcon className="animate-spin text-muted-foreground size-5" />
          </div>
        )}
        {!isLoading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => loadMore()}
            disabled={isLoading}
          >
            {hasNext ? "Load more" : "End of results"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default DocumentsTable;
