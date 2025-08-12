import type { Transaction } from "@/lib/get-dashboard-data";

interface CategoryColors {
  [key: string]: string;
}

export function categorizeTransactions(transactions: Transaction[]) {
  const categoryColors: CategoryColors = {
    income: "#4CAF50",
    housing: "#0466C8",
    food: "#38B000",
    utilities: "#FF9500",
    investment: "#277DA1",
    entertainment: "#F72585",
    travel: "#FF6347",
    healthcare: "#8BC34A",
    insurance: "#FFC107",
    education: "#03A9F4",
    miscellaneous: "#BDBDBD",
  };

  const expensesByCategory: Record<string, number> = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      if (!expensesByCategory[transaction.category]) {
        expensesByCategory[transaction.category] = 0;
      }
      expensesByCategory[transaction.category] += transaction.amount;
    }
  });

  // Prepare the expensesByCategoryData array with category names, values, and colors
  const expensesByCategoryData = Object.entries(expensesByCategory).map(
    ([category, value]) => ({
      name: category[0].toUpperCase() + category.slice(1),
      value,
      color: categoryColors[category] || "#ccc", // fallback color
    })
  );

  return expensesByCategoryData;
}
