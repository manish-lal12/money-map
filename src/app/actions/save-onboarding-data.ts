"use server";

import { prisma } from "@/lib/db";
import { Category, TransactionType } from "@prisma/client";

import { OnboardingFormValues } from "@/components/onboarding-page/onboarding-form";
import { auth } from "../../../auth";

export async function handleOnboarding(data: OnboardingFormValues) {
  const session = await auth();
  const userEmail = session?.user?.email;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail as string,
    },
  });
  const userId = user?.id;

  if (!userId) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  const transactions = [
    ...data.monthlyIncome.map((income) => ({
      userId,
      type: TransactionType.income,
      category: Category.income,
      amount: income.amount,
      description: `${Category.income}`,
      date: new Date(income.month),
    })),

    // expense transactions
    ...data.monthlyExpenses.flatMap((entry) =>
      entry.expenses.map((expense) => ({
        userId,
        type: TransactionType.expense,
        category: expense.category,
        amount: expense.amount,
        description: `${Category[expense.category]}`,
        date: new Date(entry.month),
      }))
    ),
  ];

  // calculate savings from transactions (income - expenses)
  function calculateSavings(
    transactions: {
      date: Date;
      type: TransactionType;
      category: Category;
      amount: number;
    }[]
  ) {
    const savingsMap: Record<string, number> = {};

    for (const t of transactions) {
      const date = t.date.toISOString().slice(0, 7); // YYYY-MM format
      // start of the month
      const fullDate = new Date(date + "-01").toISOString();

      if (!savingsMap[fullDate]) {
        savingsMap[fullDate] = 0;
      }

      if (t.type === TransactionType.income) {
        savingsMap[fullDate] += t.amount;
      } else if (t.type === TransactionType.expense) {
        savingsMap[fullDate] -= t.amount;
      }
    }

    // convert to array of objects
    const savings = Object.keys(savingsMap).map((date) => ({
      date: date,
      amount: savingsMap[date],
      userId: userId as string,
    }));

    return savings;
  }

  try {
    await Promise.all([
      // save assets
      prisma.assets.create({
        data: {
          userId: userId as string,
          name: "Total Assets",
          amount: 1000,
        },
      }),

      // save transactions
      prisma.transactions.createMany({
        data: transactions,
      }),

      // save financial goals
      prisma.financialGoals.createMany({
        data: data.savingGoals.map((goal) => ({
          userId,
          title: goal.name,
          amount: goal.amount,
          duration: goal.duration,
          description: goal.description,
        })),
      }),

      // save savings
      prisma.savings.createMany({
        data: calculateSavings(transactions),
      }),

      prisma.user.update({
        where: {
          id: userId as string,
        },
        data: {
          isOnboarded: true,
        },
      }),
    ]);
    return {
      message: "Successfully saved onboarding data",
    };
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return {
      error: true,
      message: "Error saving onboarding data",
    };
  }
}
