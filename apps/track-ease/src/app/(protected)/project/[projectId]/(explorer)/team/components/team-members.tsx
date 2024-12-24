import { ChevronDownIcon } from "@radix-ui/react-icons";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { ScrollArea } from "@repo/ui/components/scroll-area";

export function TeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Team Members</CardTitle>
        <CardDescription>Collaborate with your team !</CardDescription>
      </CardHeader>
      <ScrollArea className="h-[60vh]">
        <CardContent className="grid gap-6">
          {Array.from({ length: 12 }).map((d, i) => (
            <div
              className="flex items-center justify-between space-x-4"
              key={i}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-xs text-muted-foreground">m@example.com</p>
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto w-28">
                    Owner{" "}
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Know about..." />
                    <CommandList>
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                          <p>Tasks</p>
                          <p className="text-sm text-muted-foreground">
                            View all tasks assigned to member.
                          </p>
                        </CommandItem>
                        <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                          <p>Profile</p>
                          <p className="text-sm text-muted-foreground">
                            Know about this member.
                          </p>
                        </CommandItem>
                        <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                          <p>Blogs</p>
                          <p className="text-sm text-muted-foreground">
                            View blogs by members.
                          </p>
                        </CommandItem>
                        <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                          <p>Endorsements</p>
                          <p className="text-sm text-muted-foreground">
                            View strengths for this member.
                          </p>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
