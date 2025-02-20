import { TableRow, TableCell } from "@repo/ui/components/table";
import { format } from "date-fns/format";
import { Building2Icon, CircleUser } from "lucide-react";
import React from "react";
import { SiGoogledocs } from "react-icons/si";
import DocumentMenu from "./document-menu";

interface DocumentRowProps {
  document: {
    id: string;
    title: string | null;
    initialContent: string | null;
    ownerId: string;
    roomId: string | null;
    projectId: string;
  };
}

function DocumentRow({ document }: DocumentRowProps) {
  const onNewTabClick = (id: string) => {
    window.open(`./documents/${id}`, "_blank");
  };
  return (
    <TableRow>
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-gray-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.projectId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUser className="size-4" />
        )}
        {document.projectId ? "Project" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document.id}
          title={document.title}
          onNewTabClick={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
}

export default DocumentRow;
