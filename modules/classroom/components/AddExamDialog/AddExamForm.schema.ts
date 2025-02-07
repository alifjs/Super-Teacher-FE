import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const addExamFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required!"),
  instruction: z.string().trim().min(1, "Instruction is required"),
  file : z.instanceof(File, { message: "File is required" }),
  scheduleDate: z
  .string()
  .refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid date",
  })
  .refine((val) => new Date(val) >= new Date(), {
    message: "The schedule date must be in the future!",
  })
  .transform((val) => new Date(val)),
});
