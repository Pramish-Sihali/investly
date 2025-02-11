import { z } from "zod";

export const testimonialFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  testimonial: z.string().min(5, "Testimonial must be at least 5 characters"),
  source: z.string().optional(),
  image: z.any().optional(),
});

export type TestimonialFormSchema = z.infer<typeof testimonialFormSchema>;
