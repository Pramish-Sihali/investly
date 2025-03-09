import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z.string().nonempty('First name is required.'),
  last_name: z.string().nonempty('Last name is required.'),
  phone_number: z.string().nonempty('Phone number is required.'),
  email: z.string().email('Invalid email address.').nonempty('Email is required.'),
  message: z.string().nonempty('Message is required.'),
  who_you_are: z.string().nonempty('Please select an option.'),
  property: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
