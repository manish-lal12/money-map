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
        Assets: true,
        Investments: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Overview stats
    const totalBalance = user.Assets.reduce(
      (sum, asset) => sum + asset.amount,
      0
    );

    let currentMonthIncome = 0; // Income for the current month
    let currentMonthExpenses = 0; // Expenses for the current month

    // Monthly and category-based aggregations
    const categoryColors: Record<string, string> = {
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
    const monthlyMap: Record<
      number,
      {
        name: string;
        totalIncome: number;
        totalExpenses: number;
        value: number; // net balance (income - expenses)
      }
    > = {};

    const currentMonthIndex = new Date().getMonth(); // Current month index

    for (const t of user.Transactions) {
      const monthIndex = t.date.getMonth();
      const monthName = t.date.toLocaleString("default", { month: "short" });

      // Initialize month data if not already done
      if (!monthlyMap[monthIndex]) {
        monthlyMap[monthIndex] = {
          name: monthName,
          totalIncome: 0,
          totalExpenses: 0,
          value: 0,
        };
      }

      // Accumulate totals for each month
      if (t.type === "income") {
        monthlyMap[monthIndex].totalIncome += t.amount;

        if (monthIndex === currentMonthIndex) {
          currentMonthIncome += t.amount; // For current month only
        }
      } else if (t.type === "expense") {
        monthlyMap[monthIndex].totalExpenses += t.amount;

        if (monthIndex === currentMonthIndex) {
          currentMonthExpenses += t.amount; // For current month only
        }

        // Aggregate expenses by category
        if (!expensesByCategory[t.category]) {
          expensesByCategory[t.category] = 0;
        }
        expensesByCategory[t.category] += t.amount;
      }
    }

    // Calculate savings rate
    const savingsRate =
      currentMonthIncome > 0
        ? ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome) *
          100
        : 0;

    // Prepare expenses data by category
    const expensesByCategoryData = Object.entries(expensesByCategory).map(
      ([category, value]) => ({
        name: category[0].toUpperCase() + category.slice(1),
        value,
        color: categoryColors[category] || "#ccc", // fallback color
      })
    );

    const monthlyOverviewData = Object.values(monthlyMap).map((month) => ({
      name: month.name,
      value: month.totalIncome - month.totalExpenses,
      income: month.totalIncome,
      expenses: month.totalExpenses,
    }));

    const savingsData = user.Savings.map((s) => ({
      name: s.date.toLocaleString("default", { month: "short" }),
      value: s.amount,
    }));

    const recentTransactions = [...user.Transactions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10)
      .map((t) => ({
        id: t.id,
        description: t.description,
        date: t.date,
        category: t.category,
        type: t.type,
        amount: t.amount,
      }));

    return NextResponse.json({
      totalBalance,
      currentMonthIncome,
      currentMonthExpenses,
      savingsRate,
      expensesByCategoryData,
      monthlyOverviewData,
      savingsData,
      transactions: recentTransactions,
    });
  } catch (error) {
    console.error("API /api/dashboard error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
