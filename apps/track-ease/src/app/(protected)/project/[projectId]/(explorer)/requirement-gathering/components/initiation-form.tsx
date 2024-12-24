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
import { TrashIcon } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import {
  createReleaseDraft,
  createRelease,
  createInitiation,
  createInitiationDraft,
} from "@/app/actions";
import { toast } from "@repo/ui/components/use-toast";
import { cn } from "@repo/ui/lib/utils";

const initiationFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Release name is required"),
  description: z.string().min(1, "Description is required"),
  highLevelRequirements: z
    .array(
      z.object({
        id: z.string().optional(),
        priority: z.number(),
        requirement: z
          .string({ message: "Please enter requirement" })
          .min(10, "Requirement should be at least 10 characters"),
      })
    )
    .nonempty("Should have al least one high level requirement"),
});

const initiationDraftFormSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  highLevelRequirements: z
    .array(
      z.object({
        id: z.string(),
        priority: z.number().optional(),
        requirement: z.string(),
      })
    )
    .optional(),
});

export type InitiationFormValues = z.infer<typeof initiationFormSchema>;
export type InitiationDraftFormValues = z.infer<
  typeof initiationDraftFormSchema
>;

const defaultValues: InitiationFormValues = {
  name: "",
  description: "",
  highLevelRequirements: [{ requirement: "", priority: 1 }],
};

function InitiationForm({
  projectId,
  draft,
}: {
  projectId: string;
  draft: InitiationFormValues | null;
}) {
  const form = useForm({
    resolver: zodResolver(initiationFormSchema),
    defaultValues,
    values: draft ? draft : defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "highLevelRequirements",
    control: form.control,
  });

  console.log(draft, "CDM");

  const { mutate, isPending } = useMutation({
    mutationFn: (newInitiation: z.infer<typeof initiationFormSchema>) => {
      console.log(newInitiation, "NP");
      return createInitiation(projectId, newInitiation);
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

  const { mutate: draftMutate, isPending: draftPending } = useMutation({
    mutationFn: (newInitiationDraft: z.infer<typeof initiationFormSchema>) => {
      console.log(newInitiationDraft, "NRD");
      return createInitiationDraft(projectId, newInitiationDraft as any);
    },
    onSuccess: () => {
      toast({
        title: "Your changes are saved!",
        description: "Your release draft is saved successfully.",
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

  function onSubmit(data: InitiationFormValues) {
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
        <SheetTitle>
          {draft ? "Drafted Initiation" : "Create Initiation"}
        </SheetTitle>
        <SheetDescription>
          Give high level details for your coming idea!. This will undergo
          separate grooming once epic is created :)
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
                  <FormLabel>Name</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input placeholder="Idea Q1" {...field} />
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
                        placeholder="Tell us a little bit about your ask"
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`highLevelRequirements.${index}.requirement`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Add Requirements
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Just on high level details give details with priority :)
                      </FormDescription>
                      <FormControl>
                        <div className="flex items-center">
                          <div>{`#${index + 1}`}</div>
                          <Input {...field} className="flex-1 ml-4" />
                          <Button
                            type="button"
                            onClick={() => remove(index)}
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
              <div className="flex justify-end mt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      priority: fields.length + 1,
                      requirement: "",
                    })
                  }
                >
                  Add URL
                </Button>
              </div>
            </div>
          </div>
          <SheetFooter className="mt-4">
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

export default InitiationForm;
