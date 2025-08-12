import { z } from "zod";
import { Category, TransactionType } from "@prisma/client";

export const AddTransactionSchema = z.object({
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters long" }),
  date: z.date({ message: "Invalid date format" }),
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  category: z.nativeEnum(Category),
  type: z.nativeEnum(TransactionType),
});
