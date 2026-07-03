import z from "zod";

export const preInterviewBody = z.object({
    gitHub: z.string().url(),
    linkedin: z.string().url().optional()
})