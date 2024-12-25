"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title of task",
  }),
  description: z.string().min(1, { message: "Description of task" }),
  status: z.string().min(1, { message: "Status of task" }),
});

function getApiData() {
  // Calls some API and returns the data
}

export default function Page() {

  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetch("/api/v1/tasks").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: (newTask: z.infer<typeof formSchema>) => {
      return fetch("/api/v1/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    mutation.mutate(values);
  }

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div className="flex">
      <div className="w-[50%] p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="complete next.js" {...field} />
                  </FormControl>
                  <FormDescription>This is your title of task.</FormDescription>
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
                    <Input placeholder="complete next.js" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your description of task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="complete next.js" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your status of task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="w-[50%] p-8">
        {data?.tasks?.map((item: { title: string; id: number }) => (
          <div key={item.id}>{item?.title}</div>
        ))}
      </div>
    </div>
  );
}
