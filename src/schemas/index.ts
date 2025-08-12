import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password required" }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      ),
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  image: z.string(),
  bio: z.string().max(160).optional(),
  dob: z.date().optional(),
  phone: z
    .string()
    .max(10, { message: "Phone number cannot be more than 10 digits" })
    .optional(),
  address: z.string().optional(),
});

export const welcomeFormSchema = z.object({
  totalAssets: z.number().min(0, {
    message: "Total assets must be a positive number.",
  }),
  monthlyIncome: z.number().min(0, {
    message: "Monthly income must be a positive number.",
  }),
  monthlyExpenses: z.number().min(0, {
    message: "Monthly expenses must be a positive number.",
  }),
  savingsGoal: z.number().min(0, {
    message: "Savings goal must be a positive number.",
  }),
});
