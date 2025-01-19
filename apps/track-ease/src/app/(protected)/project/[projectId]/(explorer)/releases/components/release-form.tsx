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
import {
  createReleaseDraft,
  createRelease,
  getEpicDetails,
} from "@/app/actions";
import { toast } from "@repo/ui/hooks/use-toast";
import { cn } from "@repo/ui/lib/utils";
import MultipleSelector from "@repo/ui/components/multiple-selector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { format, addDays } from "date-fns";
import { Calendar } from "@repo/ui/components/calendar";

const releaseFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Release name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.object({ from: z.date(), to: z.date().optional() }),
  epics: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

const releaseDraftFormSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.object({ from: z.date(), to: z.date().optional() }).optional(),
  epics: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

export type ReleaseFormValues = z.infer<typeof releaseFormSchema>;
export type ReleaseDraftFormValues = z.infer<typeof releaseDraftFormSchema>;

const defaultValues: ReleaseFormValues = {
  name: "",
  description: "",
  duration: { from: new Date(), to: addDays(new Date(), 30) },
};

function ReleaseForm({
  projectId,
  draft,
  release,
}: {
  projectId: string;
  draft: ReleaseFormValues | null;
  release: ReleaseFormValues | null;
}) {
  const {
    data: epicsData,
    isPending: epicsIsPending,
    isError: epicsIsError,
    error: epicsError,
  } = useQuery({
    queryKey: ["epicData"],
    queryFn: async () => {
      return await getEpicDetails(null);
    },
    select: (data) => {
      if (Array.isArray(data)) {
        const formattedData = data?.map((task: any) => ({
          value: task.id,
          label: task.title,
        }));
        return formattedData;
      }
      return [];
    },
  });

  const form = useForm({
    resolver: zodResolver(releaseFormSchema),
    defaultValues,
    values: draft ? draft : release ? release : defaultValues,
    mode: "onChange",
  });

  console.log(draft, "DDDD");

  const { mutate, isPending } = useMutation({
    mutationFn: (newRelease: z.infer<typeof releaseFormSchema>) => {
      console.log(newRelease, "NP");
      return createRelease(projectId, newRelease, release?.id ? true : false);
    },
    onSuccess: () => {
      toast({
        title: "Your changes are saved!",
        description: "Your release created successfully.",
      });
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

  const { mutate: draftMutate, isPending: draftPending } = useMutation({
    mutationFn: (newReleaseDraft: z.infer<typeof releaseFormSchema>) => {
      console.log(newReleaseDraft, "NRD");
      return createReleaseDraft(projectId, newReleaseDraft);
    },
    onSuccess: () => {
      toast({
        title: "Your changes are saved!",
        description: "Your release draft is saved successfully.",
      });
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

  function onSubmit(data: ReleaseFormValues) {
    console.log(data, "aaa");
    mutate(data);
  }

  console.log(form.formState);

  const handleSaveDraft = () => {
    console.log(form.getValues(), "from values");
    draftMutate(form.getValues());
  };

  return (
    <SheetContent className="xl:w-[600px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
      <SheetHeader>
        <SheetTitle>{draft ? "Drafted Release" : "Create Release"}</SheetTitle>
        <SheetDescription>
          Give high level details for your coming release!. This will undergo
          separate grooming once release is created :)
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Release Name</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input placeholder="Release Q1" {...field} />
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
                        placeholder="Tell us a little bit about this release"
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Duration</FormLabel>
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
                      Select release start and end date.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="epics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Epics</FormLabel>
                  <FormDescription>
                    Select tasks for this sprint. These can be edited later :)
                  </FormDescription>
                  <FormControl>
                    <div className="flex items-center">
                      <MultipleSelector
                        options={epicsData}
                        placeholder={"Select epics for this release."}
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                        value={field.value}
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
            {!release && (
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  name="draftBtn"
                >
                  {draft ? "Save draft" : "Save as draft"}
                </Button>
              </SheetClose>
            )}
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

export default ReleaseForm;
