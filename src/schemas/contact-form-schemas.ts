import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z.string().min(2, "First name is required."),
  last_name: z.string().min(2, "Last name is required."),
  phone_number: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number.")
    .nonempty("Phone number is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(1, "Message is required."),
  property: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
