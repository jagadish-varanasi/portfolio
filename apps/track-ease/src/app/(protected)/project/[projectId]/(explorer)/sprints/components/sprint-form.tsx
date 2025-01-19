"use client";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetContent,
} from "@repo/ui/components/sheet";
import { Textarea } from "@repo/ui/components/textarea";
import { CalendarIcon, TrashIcon } from "lucide-react";
import { Input } from "@repo/ui/components/input";
import React from "react";
import { Button } from "@repo/ui/components/button";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { ToastAction } from "@repo/ui/components/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createReleaseDraft, createRelease, createSprint } from "@/app/actions";
import { toast } from "@repo/ui/hooks/use-toast";
import { cn } from "@repo/ui/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { addDays, format } from "date-fns";
import { Calendar } from "@repo/ui/components/calendar";
import MultipleSelector from "@repo/ui/components/multiple-selector";

const sprintFormSchema = z.object({
  releaseId: z.string(),
  name: z.string().min(1, "Release name is required"),
  description: z.string().min(1, "Description is required"),
  sprintDuration: z.object({ from: z.date(), to: z.date().optional() }),
  tasks: z.array(z.object({ value: z.number(), label: z.string() })).optional(),
});

export type SprintFormValues = z.infer<typeof sprintFormSchema>;

const defaultValues: SprintFormValues = {
  name: "",
  releaseId: "",
  description: "",
  sprintDuration: { from: new Date(), to: addDays(new Date(), 10) },
  tasks: undefined,
};

function SprintForm({
  projectId,
  draft,
}: {
  projectId: string;
  draft: SprintFormValues | null;
}) {
  const form = useForm({
    resolver: zodResolver(sprintFormSchema),
    defaultValues,
    mode: "onChange",
  });

  console.log(form.getValues(), "FORM");

  const { error: releasesError, data: releasesData } = useQuery({
    queryKey: ["releases"],
    queryFn: () =>
      fetch(`/api/v1/releases?projectId=${projectId}`).then((res) =>
        res.json()
      ),
  });

  const { error: tasksError, data: tasksData } = useQuery({
    queryKey: ["tasks", form.getValues("releaseId")],
    queryFn: () =>
      fetch(`/api/v1/tasks/userstories?id=${form.getValues("releaseId")}`).then(
        (res) => res.json()
      ),
    select: (data) => {
      const formattedData = data.userStories.map((task: any) => ({
        value: task.id,
        label: task.title,
      }));
      return formattedData;
    },
  });

  console.log(tasksData, "tasks");

  const { mutate, isPending } = useMutation({
    mutationFn: (sprint: z.infer<typeof sprintFormSchema>) => {
      console.log(sprint, "NP");
      return createSprint(sprint, projectId);
    },
    onSuccess: () => {
      toast({
        title: "Your changes are saved!",
        description: "Your release created successfully.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  function onSubmit(data: SprintFormValues) {
    console.log(data, "aaa");
    mutate(data);
  }

  console.log(form.formState);

  return (
    <SheetContent className="xl:w-[600px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
      <SheetHeader>
        <SheetTitle>Create Sprint</SheetTitle>
        <SheetDescription>
          Select all tasks that will be taken up in this sprint based on scope
          and discussions. :)
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="releaseId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Select Release</FormLabel>
                  <div className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select relevant release" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Releases</SelectLabel>
                          {releasesData?.releases?.map(
                            (release: { id: string; name: string }) => (
                              <SelectItem key={release.id} value={release.id}>
                                {release.name}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Sprint Name</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input placeholder="Sprint design system" {...field} />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel> Short description</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us a little bit about this sprint"
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sprintDuration"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Sprint duration</FormLabel>
                  <div className="col-span-3">
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select sprint start and end date.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tasks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add User Stories</FormLabel>
                  <FormDescription>
                    Select user stories for this sprint. These can be edited
                    later :)
                  </FormDescription>
                  <FormControl>
                    <div className="flex items-center">
                      <MultipleSelector
                        options={tasksData}
                        placeholder={"Select task for this sprint."}
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SheetFooter className="mt-4">
            <SheetClose asChild disabled={!form.formState.isValid}>
              <Button type="submit" name="saveBtn">
                Submit
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}

export default SprintForm;
