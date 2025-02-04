import { z } from "zod";

export const addAssignmentFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required!"),
  instruction: z.string().trim().min(1, "Instruction is required"),
  file : z.instanceof(File, { message: "File is required" }),
  deadline: z
  .string()
  .refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid date",
  })
  .refine((val) => new Date(val) >= new Date(), {
    message: "The deadline must be in the future!",
  })
  .transform((val) => new Date(val)),
});
