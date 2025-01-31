"use client";

import { ColumnDef } from "@tanstack/react-table";
import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Badge } from "@repo/ui/components/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { Icons } from "@repo/ui/components/icons";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[50px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      console.log(row, "ROW-123");
      return (
        <div className="flex space-x-2">
          <div className="flex gap-1">
            {label && <Badge variant="outline">{label.label}</Badge>}
            <Badge variant="outline" className="capitalize">
              {row.original.issueType?.toLocaleLowerCase()}
            </Badge>
          </div>
          <span className="max-w-[530px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium capitalize">
                {(row.getValue("assignee") as any)?.name}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex gap-1 items-center">
              {(row.getValue("assignee") as any)?.email}
              <Icons.clipboard className="ml-2 h-4 w-4" />
            </p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Epic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Epic" />
    ),
    cell: ({ row }) => {
      console.log(row, "ROW");
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate">
            {row?.original.Epic?.title}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "release",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Release" />
    ),
    cell: ({ row }) => {
      console.log(row, "ROW");
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("Sprint") as any)?.release?.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Sprint",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sprint" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("Sprint") as any)?.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
