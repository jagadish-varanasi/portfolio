import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Separator } from "@repo/ui/components/separator";

export function ProjectCard({
  project,
}: {
  project: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    id: string;
    ProjectOnUsers: any;
  };
}) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_140px] items-start gap-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <StarIcon className="mr-2 h-4 w-4" />
            favorite
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuLabel>Quick Links</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Details
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Tasks</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Analytics</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" /> Create Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground justify-between">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {`${format(project.startDate.toString(), "LLLL d, yyyy")} -
              ${format(project.endDate.toString(), "LLLL d, yyyy")}`}
          </div>
          <div className="flex items-center">
            <PersonIcon className="mr-1 h-3 w-3" />
            {project.ProjectOnUsers?.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
