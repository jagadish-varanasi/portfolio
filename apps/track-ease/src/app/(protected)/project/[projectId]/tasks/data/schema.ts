import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  label: z.string().nullable(),
  priority: z.string().nullable(),
  Sprint: z
    .object({
      name: z.string(),
      release: z.object({ name: z.string() }).nullable(),
    })
    .nullable(),
});

export type Task = z.infer<typeof taskSchema>;
