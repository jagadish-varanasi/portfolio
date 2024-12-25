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
import { toast } from "@repo/ui/hooks/use-toast";
import { cn } from "@repo/ui/lib/utils";
import Details from "./details";

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
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  highLevelRequirements: z
    .array(
      z.object({
        id: z.string(),
        priority: z.number().nullable().optional(),
        requirement: z.string().nullable().optional(),
        initiationDraftId: z.string().nullable(),
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
  highLevelRequirements: [{ requirement: "", priority: 0 }],
};

function SidePanel({
  projectId,
  draft,
  ac,
}: {
  projectId: string;
  draft: InitiationFormValues | InitiationDraftFormValues | null;
  ac: any;
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
    mutationFn: (
      newInitiationDraft: z.infer<typeof initiationDraftFormSchema>
    ) => {
      console.log(newInitiationDraft, "NRD");
      return createInitiationDraft(projectId, newInitiationDraft);
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

  // const handleSaveDraft = () => {
  //   console.log(form.getValues(), "from values");
  //   draftMutate(form.getValues());
  // };

  return (
    <SheetContent className="xl:w-[815px] xl:max-w-none sm:w-[200px] sm:max-w-[540px]">
      <SheetHeader>
        <SheetTitle>{"Acceptance Criteria Document"}</SheetTitle>
        <SheetDescription>
          This is the detailed document about this epic.
        </SheetDescription>
      </SheetHeader>
      <Details ac={ac} />
    </SheetContent>
  );
}

export default SidePanel;
