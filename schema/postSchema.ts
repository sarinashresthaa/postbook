import z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title too short")
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Title must contain at least 2 words",
    }),

  body: z.string().refine((value) => value.trim().split(/\s+/).length >= 5, {
    message: "Body must contain at least 5 words",
  }),
});

export type PostFormData = z.infer<typeof postSchema>;
