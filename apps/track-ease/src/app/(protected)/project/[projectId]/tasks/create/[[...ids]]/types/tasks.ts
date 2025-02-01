import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z.string(),
  status: z.string(),
  issueType: z.string(),
  label: z.string(),
  priority: z.string(),
  storyPoints: z.string().optional(),
  sprint: z.string().optional(),
  startDate: z
    .date({ required_error: "Start/End date cannot be empty" })
    .optional(),
  endDate: z.date({ required_error: "Start/End date cannot be empty" }),
  parentTaskId: z.string().optional(),
  epicId: z.string().optional(),
  projectId: z.string(),
  userId: z.string(),
  reporterId: z.string(),
  discussions: z
    .array(
      z.object({
        content: z.string(),
      })
    )
    .nonempty(),
});
