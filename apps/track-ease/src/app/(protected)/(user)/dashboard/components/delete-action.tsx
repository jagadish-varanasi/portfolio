"use client";
import { deleteProject } from "@/app/actions";
import { toast } from "@repo/ui/hooks/use-toast";
import React from "react";

function DeleteAction({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    deleteProject(id)
      .then(() => {
        toast({
          title: "Deleted!",
          description: "Your project is delete successfully.",
        });
      })
      .catch((err) => {
        toast({
          title: "Couldn't delete!",
          description: "Your project is deletion failed.",
        });
      });
  };
  return <div onClick={handleDelete}>{children}</div>;
}

export default DeleteAction;
