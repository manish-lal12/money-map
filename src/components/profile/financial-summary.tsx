"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BsCashStack } from "react-icons/bs";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MdOutlineSavings } from "react-icons/md";
import { TbTax } from "react-icons/tb";
import { formatCurrency } from "@/utils/financialUtils";
import { useSession } from "next-auth/react";

interface FinancialData {
  netWorth: {
    amount: number;
    percentageChange: number;
  };
  taxReturns: {
    amount: number;
    percentageChange: number;
  };
  savings: {
    amount: number;
    percentageChange: number;
  };
  monthlyExpenses: {
    amount: number;
    percentageChange: number;
  };
}

export const FinancialSummary = () => {
  const { data: session } = useSession();
  const [financialData, setFinancialData] = useState<FinancialData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      setIsLoading(true);
      fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch financial summary");
          }
          return response.json();
        })
        .then((data) => {
          setFinancialData(data);
        })
        .catch((err) => {
          setError("Error fetching financial summary");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session]);

  const renderPercentageChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <div
        className={`flex items-center text-xs ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? <TrendingUp /> : <TrendingDown />}
        <span>
          {isPositive ? "+" : ""}
          {change.toFixed(1)}% {isPositive ? "up" : "down"} from last year
        </span>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading financial summary...</div>;
  }

  if (error || !financialData) {
    return (
      <div className="text-red-500">
        {error || "Failed to load financial summary"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <BsCashStack className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatCurrency(financialData.netWorth.amount)}
            </div>
            {renderPercentageChange(financialData.netWorth.percentageChange)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Returns</CardTitle>
            <TbTax className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatCurrency(financialData.taxReturns.amount)}
            </div>
            {renderPercentageChange(financialData.taxReturns.percentageChange)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Savings
            </CardTitle>
            <MdOutlineSavings className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatCurrency(financialData.savings.amount)}
            </div>
            {renderPercentageChange(financialData.savings.percentageChange)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Expenses
            </CardTitle>
            <TrendingDown className="text-3xl text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {formatCurrency(financialData.monthlyExpenses.amount)}
            </div>
            {renderPercentageChange(
              financialData.monthlyExpenses.percentageChange
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
