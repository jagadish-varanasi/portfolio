import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(1).max(45),
  description: z.string().min(1).max(45),
  subdirectory: z.string().min(1).max(5),
});
