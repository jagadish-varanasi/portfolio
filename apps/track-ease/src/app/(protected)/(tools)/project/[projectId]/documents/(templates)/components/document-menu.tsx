import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { ExternalLinkIcon, MoreVertical } from "lucide-react";
import React from "react";

interface DocumentMenuProps {
  documentId: string;
  title: string | null;
  onNewTabClick: (id: string) => void;
}

function DocumentMenu({ documentId, title, onNewTabClick }: DocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onNewTabClick(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DocumentMenu;
