import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1,'Current Password is required'),
    newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
    confirmPassword: z.string().min(1, "Confirm New Password is required").transform((val) => val.trim()).refine(val => val.length > 0, {
      message: "Confirm New Password is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });