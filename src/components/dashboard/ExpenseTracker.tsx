import React, { useState } from "react";
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

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

const ExpenseTracker: React.FC = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: new Date().toISOString(),
      description: "Salary",
      amount: 100000,
      type: "income",
      category: "Income",
    },
    {
      id: 2,
      date: new Date().toISOString(),
      description: "Rent",
      amount: 25000,
      type: "expense",
      category: "Housing",
    },
    {
      id: 3,
      date: new Date().toISOString(),
      description: "Groceries",
      amount: 6000,
      type: "expense",
      category: "Food",
    },
    {
      id: 4,
      date: new Date().toISOString(),
      description: "Electricity Bill",
      amount: 3000,
      type: "expense",
      category: "Utilities",
    },
    {
      id: 5,
      date: new Date().toISOString(),
      description: "Mobile Bill",
      amount: 1000,
      type: "expense",
      category: "Utilities",
    },
    {
      id: 6,
      date: new Date().toISOString(),
      description: "Mutual Fund SIP",
      amount: 10000,
      type: "expense",
      category: "Investments",
    },
    {
      id: 7,
      date: new Date().toISOString(),
      description: "Movie",
      amount: 1500,
      type: "expense",
      category: "Entertainment",
    },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setNewTransaction((prev) => ({
      ...prev,
      type: value as "income" | "expense",
    }));
  };

  const handleAddTransaction = () => {
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
        ? "Income"
        : categorizeTransaction(newTransaction.description);

    const transaction: Transaction = {
      id: Date.now(),
      date: new Date(newTransaction.date).toISOString(),
      description: newTransaction.description,
      amount: amount,
      type: newTransaction.type as "income" | "expense",
      category: category,
    };

    setTransactions((prev) => [transaction, ...prev]);

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
  };

  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});

  const expenseByCategoryData = Object.entries(expenseByCategory).map(
    ([name, value]) => {
      const categoryColor =
        expenseCategories.find((c) => c.name === name)?.color || "#6C757D";
      return { name, value, color: categoryColor };
    }
  );

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    return { month: monthIndex, name: monthNames[monthIndex] };
  }).reverse();

  const monthlyExpenseData = last6Months.map(({ month, name }) => {
    const totalExpense = transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === month && t.type === "expense";
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const totalIncome = transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === month && t.type === "income";
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name,
      expenses: totalExpense,
      income: totalIncome,
      value: totalExpense,
    };
  });

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
          data={monthlyExpenseData}
          dataKey="expenses"
          additionalDataKeys={["income"]}
          colors={["#FF9500", "#0466C8"]}
        />

        <FinancialChart
          title="Expense Breakdown"
          type="pie"
          data={expenseByCategoryData}
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
                      {new Date(transaction.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
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
