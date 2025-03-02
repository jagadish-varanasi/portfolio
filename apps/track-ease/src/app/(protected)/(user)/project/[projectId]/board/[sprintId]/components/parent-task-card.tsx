import { CheckCircle2, Plus, ChevronDown, BookCheckIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card, CardHeader } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import type { ParentTask, DevStatus } from "./types";
import { useState } from "react";
import { taskSchema } from "../../../tasks/data/schema";
import ColorHash from "color-hash";

interface ParentTaskCardProps {
  task: ParentTask;
  completed: number;
  total: number;
  devStatusConfig: Record<DevStatus, { label: string; color: string }>;
  onAddChild: (content: string) => void;
  onDevStatusChange: (status: DevStatus) => void;
  canChangeDevStatus: boolean;
}

export function ParentTaskCard({
  task,
  completed,
  total,
  devStatusConfig,
  onAddChild,
  onDevStatusChange,
  canChangeDevStatus,
}: ParentTaskCardProps) {
  const devStatusInfo = devStatusConfig[task.devStatus];

  const statusColors = {
    TODO: "text-gray-100 text-gray-700",
    INPROGRESS: "bg-yellow-100 text-yellow-700",
    DONE: "bg-green-100 text-green-700",
  };

  const badgeColor = statusColors[task.status || "TODO"];
  const colorHash = new ColorHash({ lightness: 0.75 });
  return (
    <Card className="relative">
      <CardHeader className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2 w-[90%]">
              <h3 className="text-base font-semibold truncate">
                {task.content}
              </h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant={task.status === "DONE" ? "default" : "secondary"}
                >
                  {completed}/{total}
                </Badge>
                <Badge
                  className={`capitalize ${badgeColor}`}
                  variant="secondary"
                >
                  {task.status?.toLocaleLowerCase()}
                </Badge>
                {task.status === "DONE" && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
            </div>
            <div className="w-[10%]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Child Task</DialogTitle>
                  </DialogHeader>
                  <AddChildTaskForm onSubmit={onAddChild} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{task.storyPoints}</Badge>
            <h4 className="text-sm bg-secondary px-1 capitalize rounded-md">
              {task.assignee || "Unassigned"}
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Badge
                variant="secondary"
                className="text-xs"
                style={{ backgroundColor: colorHash.hex(task.epicId) }}
              >
                <BookCheckIcon className="w-3 h-3 mr-1" />
                <span className="truncate max-w-[160px]">{task.epic}</span>
              </Badge>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-[140px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full text-xs h-7 ${
                            task.devStatus !== "pending"
                              ? "bg-primary text-primary-foreground"
                              : ""
                          }`}
                          disabled={!canChangeDevStatus}
                        >
                          <span className="flex-1 text-left">
                            {devStatusInfo.label}
                          </span>
                          <ChevronDown className="h-3 w-3 shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[140px]">
                        {Object.entries(devStatusConfig).map(
                          ([status, config]) => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() =>
                                onDevStatusChange(status as DevStatus)
                              }
                            >
                              {config.label}
                            </DropdownMenuItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {canChangeDevStatus
                    ? "Change development status"
                    : "Complete all child tasks before changing status"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

function AddChildTaskForm({
  onSubmit,
}: {
  onSubmit: (content: string) => void;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Enter child task"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add Task</Button>
    </div>
  );
}
