import {z} from "zod"


export const CronJobCreateSchema = z.object({
    userId: z.string().min(1, "User id is required"),
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Provide a valid url"),
    schedule: z.string().min(1, "Schedule is required"),
  });