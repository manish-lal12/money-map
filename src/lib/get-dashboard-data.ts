import { cookies } from "next/headers";
import { TransactionType } from "@prisma/client";

export interface DashboardOverviewData {
  totalBalance: number;
  currentMonthIncome: number;
  currentMonthExpenses: number;
  savingsRate: number;
  expensesByCategoryData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  monthlyOverviewData: Array<{
    name: string;
    value: number;
    income: number;
    expenses: number;
  }>;
  savingsData: Array<{ name: string; value: number }>;
  transactions: Array<{
    id: string;
    description: string;
    date: Date | undefined;
    category: string;
    type: TransactionType;
    amount: number;
  }>;
}

// check for relevance
export interface Transaction {
  id: string;
  date: undefined | Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  amount: number;
  duration: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  dob: Date;
  address: string;
  bio: string;
}

export interface TransactionData {
  transactions: Transaction[];
  monthlyOverviewData: Array<{
    name: string;
    value: number;
    income: number;
    expenses: number;
  }>;
  expensesByCategoryData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export async function getDashboardData() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/dashboard`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    const data: DashboardOverviewData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

export async function getTransactions() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/expenses`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    const data: Transaction[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expenses data:", error);
  }
}

export async function getFinancialGoals() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goals`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const data: FinancialGoal[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching financial goals data:", error);
  }
}
