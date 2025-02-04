import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const submitAssignmentSchema = z.object({
  file : z.instanceof(File, { message: "File is required" }),
});