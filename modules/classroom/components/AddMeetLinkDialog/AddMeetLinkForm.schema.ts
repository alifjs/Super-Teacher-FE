import { z } from "zod";

export const addMeetLinkFormSchema = z.object({
    meetLink: z.string()
    .regex(/^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/, { message: "Invalid Google Meet link" }),
});
