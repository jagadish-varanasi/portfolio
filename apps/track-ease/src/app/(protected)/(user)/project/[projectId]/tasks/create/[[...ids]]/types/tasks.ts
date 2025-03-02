import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(60, {
      message: "Title must not be longer than 60 characters.",
    }),
  description: z.string().optional(),
  status: z.string().optional(),
  issueType: z.string().optional(),
  label: z.string().optional(),
  priority: z.string().optional(),
  storyPoints: z.string().optional(),
  sprint: z.string().optional(),
  id: z.number().optional(),
  startDate: z
    .union([
      z.string().transform((val) => (val === "" ? undefined : new Date(val))),
      z.date({
        required_error: "Start/End date cannot be empty",
        message: "Not right type",
      }),
    ])
    .optional(),
  endDate: z
    .union([
      z.string().transform((val) => (val === "" ? undefined : new Date(val))),
      z.date({
        required_error: "Start/End date cannot be empty",
        message: "Not right type",
      }),
    ])
    .optional(),
  parentTaskId: z.string().optional(),
  epicId: z.string().optional(),
  projectId: z.string().optional(),
  userId: z.string().optional(),
  reporterId: z.string().optional(),
  discussions: z
    .array(
      z.object({
        content: z.string(),
      })
    )
    .nonempty(),
  tag: z.string().optional(),
});
