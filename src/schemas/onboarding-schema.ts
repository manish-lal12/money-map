import { describe } from "node:test";
import { z } from "zod";

// Define the schema for each form step
export const AssetsSchema = z.object({
  totalAssets: z.number().min(1, "Assets must be a positive number"),
});

export const IncomeSchema = z.object({
  monthlyIncome: z
    .array(
      z.object({
        month: z.date(),
        amount: z.number().min(1, "Income must be a positive number"),
      })
    )
    .min(1, "At least one income entry is required"),
});

export const GoalsSchema = z.object({
  savingGoals: z.array(
    z.object({
      name: z.string().min(1, "Goal name is required"),
      amount: z.number().min(1, "Target amount must be a positive number"),
      description: z.string().optional(), // corrected spelling from 'describetion' to 'description'
      duration: z.number().min(1, "Please select a duration"),
    })
  ),
});

export const ExpensesCategory = z.enum([
  "income",
  "housing",
  "food",
  "utilities",
  "entertainment",
  "investment",
  "travel",
  "healthcare",
  "insurance",
  "education",
  "miscellaneous",
]);

export const ExpensesSchema = z.object({
  monthlyExpenses: z
    .array(
      z.object({
        month: z.date(),
        expenses: z
          .array(
            z.object({
              amount: z.number().min(1, "Expenses must be a positive number"),
              category: ExpensesCategory,
            })
          )
          .min(1, "At least one expense is required"),
      })
    )
    .min(1, "At least one month's entry is required"),
});

// Combine all schemas into one
export const OnboardingFormSchema = z.object({
  ...AssetsSchema.shape,
  ...IncomeSchema.shape,
  ...GoalsSchema.shape,
  ...ExpensesSchema.shape,
});
