import { z } from "zod";

export const leadFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  personal_url: z.string().url("Please enter a valid URL").includes("https://"),
  country: z.string().min(1, "Please select your country of residence"),
  visa_type: z
    .array(z.string())
    .min(1, "Please select at least one visa status"),
  additional_info: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

export type leadFormData = z.infer<typeof leadFormSchema>;

