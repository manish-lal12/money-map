"use client"; // Ensures this is client-side

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FinancialChart from "./FinancialChart";
import {
  formatCurrency,
  categorizeTransaction,
  expenseCategories,
} from "@/utils/financialUtils";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Wallet, Plus, ArrowUpRight } from "lucide-react";
import { getDashboardData, Transaction } from "@/lib/get-dashboard-data";
import { useForm } from "react-hook-form";
import type { TransactionData } from "@/lib/get-dashboard-data";

interface ExpenseTrackerProps {
  dashboardTransactionsData: TransactionData;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  dashboardTransactionsData,
}) => {
  console.log(dashboardTransactionsData);
  const {
    transactions: transactionDetails,
    expensesByCategoryData,
    monthlyOverviewData,
  } = dashboardTransactionsData;

  const { toast } = useToast();
  const form = useForm();

  const [transactions, setTransactions] = useState<Transaction[] | []>(
    transactionDetails
  );
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: new Date().toISOString().slice(0, 10),
  });
  const [monthlyTransactionData, setMonthlyTransactionData] = useState<
    TransactionData["monthlyOverviewData"] | []
  >(monthlyOverviewData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: Transaction["type"]) => {
    setNewTransaction((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleAddTransaction = async () => {
    if (!newTransaction.description || !newTransaction.amount) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    const category =
      newTransaction.type === "income"
        ? "income"
        : categorizeTransaction(newTransaction.description);

    const transactionData = {
      description: newTransaction.description,
      date: newTransaction.date,
      amount: amount,
      type: newTransaction.type,
      category: category,
    };
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
      const newTransactionResponse = await response.json();
      setTransactions((prev) => [newTransactionResponse, ...prev]);
      setNewTransaction({
        description: "",
        amount: "",
        type: "expense",
        date: new Date().toISOString().slice(0, 10),
      });
      toast({
        title: "Transaction added",
        description: "Your transaction has been recorded successfully",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await fetch("/api/dashboard");
        const response = await dashboardData.json();
        console.log(response);

        if (!response) {
          toast({
            title: "Error",
            description: "Failed to fetch dashboard data",
            variant: "destructive",
          });
          return;
        }
        const { monthlyOverviewData } = response;
        setMonthlyTransactionData(monthlyOverviewData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        });
      }
    };
    fetchDashboardData();
  }, [transactions]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Expense Tracker</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Input
                name="description"
                value={newTransaction.description}
                onChange={handleInputChange}
                placeholder="What was this for?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <Input
                name="amount"
                type="number"
                value={newTransaction.amount}
                onChange={handleInputChange}
                placeholder="₹ Amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Select
                value={newTransaction.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                name="date"
                type="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button
            className="mt-4 w-full md:w-auto"
            onClick={handleAddTransaction}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Transaction
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <FinancialChart
          title="Monthly Expenses & Income"
          type="bar"
          data={monthlyTransactionData}
          dataKey="expenses"
          additionalDataKeys={["income"]}
          colors={["#FF9500", "#0466C8"]}
        />

        <FinancialChart
          title="Expense Breakdown"
          type="pie"
          data={expensesByCategoryData}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 border border-border rounded-md hover:bg-muted/20"
              >
                <div className="flex items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === "income"
                        ? "bg-finance-green/10 text-finance-green"
                        : "bg-finance-blue/10 text-finance-blue"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <Wallet className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(transaction.date as Date).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                      <span className="mx-1">•</span>
                      {transaction.category}
                    </div>
                  </div>
                </div>
                <p
                  className={`font-medium ${
                    transaction.type === "income"
                      ? "text-finance-green"
                      : "text-foreground"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
