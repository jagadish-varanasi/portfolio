"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { toast } from "@repo/ui/hooks/use-toast";
import { AddMembers } from "../components/add-members";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "@/app/actions";
import { Icons } from "@repo/ui/components/icons";
import { ToastAction } from "@repo/ui/components/toast";
import { DateRangePicker } from "@repo/ui/components/date-range-picker";
import { TrashIcon } from "@radix-ui/react-icons";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  description: z.string().max(500).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  members: z.array(z.object({ id: z.string(), email: z.string() })).optional(),
  owners: z.array(z.object({ id: z.string(), email: z.string() })).optional(),
  startDate: z.date({ required_error: "Start/End date cannot be empty" }),
  endDate: z.date({ required_error: "Start/End date cannot be empty" }),
});

export type ProjectFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProjectFormValues> = {
  description: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
  members: [],
  startDate: new Date(),
  endDate: new Date(),
};

export default function ProfileForm() {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newProject: z.infer<typeof profileFormSchema>) => {
      return createProject(newProject);
    },
    onSuccess: () => {
      toast({
        title: "Your changes are saved!",
        description: "Your project created successfully.",
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

  const {
    fields: f1,
    append: a1,
    remove: r1,
  } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const { fields: f2, replace: a2 } = useFieldArray({
    name: "members",
    control: form.control,
  });

  const { fields: f3, replace: a3 } = useFieldArray({
    name: "owners",
    control: form.control,
  });

  function onSubmit(data: ProjectFormValues) {
    mutate(data);
  }

  return (
    <div className="p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-6 w-full">
            <div className="w-[50%] space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project JIRA" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your project display name. It should be valid and
                      meaningful name. You cannot change this once saved.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about project"
                        className="resize-none"
                        {...field}
                        rows={7}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and
                      organizations to link to them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start and End date</FormLabel>
                    <FormControl>
                      <div>
                        <DateRangePicker
                          onUpdate={(values) => {
                            form.setValue("startDate", values.range.from);
                            form.setValue(
                              "endDate",
                              values.range.to || values.range.from
                            );
                          }}
                          initialDateFrom={form.getValues("startDate")}
                          initialDateTo={form.getValues("endDate")}
                          align="start"
                          locale="en-GB"
                          showCompare={false}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Mention project start and end date.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Project
              </Button>
            </div>
            <div className="w-[50%]  space-y-8">
              <AddMembers
                selectedMembers={(e: any) => {
                  a2(e);
                }}
                selectedOwners={(e: any) => {
                  a3(e);
                }}
              />
              <div>
                {f1.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`urls.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Document URLs
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Add document links that can be accessed to all
                          members.
                        </FormDescription>
                        <FormControl>
                          <div className="flex items-center">
                            <Input {...field} className="flex-1" />
                            <Button
                              type="button"
                              onClick={() => r1(index)}
                              className="ml-2"
                              variant="outline"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => a1({ value: "" })}
                >
                  Add URL
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
