import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        Transactions: true,
        Savings: true,
        TaxReturns: true,
        Investments: true,
        Assets: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentYear = 2025;
    const previousYear = 2024;

    // Helper function to filter records by year based on a DateTime field
    const filterByYear = (records: any[], field: string, year: number) => {
      return records.filter(
        (record) => new Date(record[field]).getFullYear() === year
      );
    };

    // Helper function to group records by month and sum amounts
    const groupByMonth = (
      records: any[],
      dateField: string,
      amountField: string,
      year: number
    ) => {
      const monthlyTotals: { [key: number]: number } = {};
      const yearRecords = filterByYear(records, dateField, year);
      yearRecords.forEach((record) => {
        const month = new Date(record[dateField]).getMonth(); // 0-11
        monthlyTotals[month] =
          (monthlyTotals[month] || 0) + (record[amountField] || 0);
      });
      return monthlyTotals;
    };

    // Net Worth: Sum of Assets.amount and Investments.amount
    const currentAssets = filterByYear(user.Assets, "updatedAt", currentYear);
    const currentInvestments = filterByYear(
      user.Investments,
      "updatedAt",
      currentYear
    );
    const previousAssets = filterByYear(user.Assets, "updatedAt", previousYear);
    const previousInvestments = filterByYear(
      user.Investments,
      "updatedAt",
      previousYear
    );

    const currentNetWorth =
      currentAssets.reduce((sum, asset) => sum + (asset.amount || 0), 0) +
      currentInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
    const previousNetWorth =
      previousAssets.reduce((sum, asset) => sum + (asset.amount || 0), 0) +
      previousInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
    const netWorthChange =
      previousNetWorth > 0
        ? ((currentNetWorth - previousNetWorth) / previousNetWorth) * 100
        : 0;

    // Tax Returns: TaxReturns.amount for the given year
    const currentTaxReturn = user.TaxReturns.find(
      (tr) => tr.year === currentYear
    );
    const previousTaxReturn = user.TaxReturns.find(
      (tr) => tr.year === previousYear
    );
    const currentTaxAmount = currentTaxReturn?.amount || 0;
    const previousTaxAmount = previousTaxReturn?.amount || 0;
    const taxReturnChange =
      previousTaxAmount > 0
        ? ((currentTaxAmount - previousTaxAmount) / previousTaxAmount) * 100
        : 0;

    // Savings: Average monthly savings for the year
    const currentSavingsByMonth = groupByMonth(
      user.Savings,
      "date",
      "amount",
      currentYear
    );
    const previousSavingsByMonth = groupByMonth(
      user.Savings,
      "date",
      "amount",
      previousYear
    );

    const currentSavingsMonths = Object.values(currentSavingsByMonth);
    const previousSavingsMonths = Object.values(previousSavingsByMonth);

    const currentSavingsAmount =
      currentSavingsMonths.length > 0
        ? currentSavingsMonths.reduce((sum, amount) => sum + amount, 0) /
          currentSavingsMonths.length
        : 0;
    const previousSavingsAmount =
      previousSavingsMonths.length > 0
        ? previousSavingsMonths.reduce((sum, amount) => sum + amount, 0) /
          previousSavingsMonths.length
        : 0;
    const savingsChange =
      previousSavingsAmount > 0
        ? ((currentSavingsAmount - previousSavingsAmount) /
            previousSavingsAmount) *
          100
        : 0;

    // Monthly Expenses: Average monthly expenses for the year
    const expenseTransactions = user.Transactions.filter(
      (t) => t.type === "expense"
    );
    const currentExpensesByMonth = groupByMonth(
      expenseTransactions,
      "date",
      "amount",
      currentYear
    );
    const previousExpensesByMonth = groupByMonth(
      expenseTransactions,
      "date",
      "amount",
      previousYear
    );

    const currentExpensesMonths = Object.values(currentExpensesByMonth);
    const previousExpensesMonths = Object.values(previousExpensesByMonth);

    const currentMonthlyExpenses =
      currentExpensesMonths.length > 0
        ? currentExpensesMonths.reduce((sum, amount) => sum + amount, 0) /
          currentExpensesMonths.length
        : 0;
    const previousMonthlyExpenses =
      previousExpensesMonths.length > 0
        ? previousExpensesMonths.reduce((sum, amount) => sum + amount, 0) /
          previousExpensesMonths.length
        : 0;
    const expensesChange =
      previousMonthlyExpenses > 0
        ? ((currentMonthlyExpenses - previousMonthlyExpenses) /
            previousMonthlyExpenses) *
          100
        : 0;

    return NextResponse.json({
      netWorth: {
        amount: currentNetWorth,
        percentageChange: netWorthChange,
      },
      taxReturns: {
        amount: currentTaxAmount,
        percentageChange: taxReturnChange,
      },
      savings: {
        amount: currentSavingsAmount,
        percentageChange: savingsChange,
      },
      monthlyExpenses: {
        amount: currentMonthlyExpenses,
        percentageChange: expensesChange,
      },
    });
  } catch (error) {
    console.error("Error fetching financial summary:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
