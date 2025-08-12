import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatCard from "./StatCard";
import FinancialChart from "./FinancialChart";
import { formatCurrency } from "@/utils/financialUtils";
import { ArrowUpRight, Wallet, CreditCard, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardOverviewData } from "@/lib/get-dashboard-data";

interface DashboardOverviewProps {
  dashboardOverviewData: DashboardOverviewData;
}
//
const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  dashboardOverviewData,
}) => {
  const {
    totalBalance,
    currentMonthExpenses,
    currentMonthIncome,
    savingsRate,
    expensesByCategoryData,
    monthlyOverviewData,
    savingsData,
  } = dashboardOverviewData;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Financial Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          icon={Wallet}
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatCard
          title="Monthly Income"
          value={formatCurrency(currentMonthIncome)}
          icon={ArrowUpRight}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(currentMonthExpenses)}
          icon={CreditCard}
          trend={{ value: 1.5, isPositive: false }}
        />
        <StatCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          icon={PiggyBank}
          // description="Monthly savings percentage"
          trend={{
            value: Number(`${savingsRate.toFixed(1)}`),
            isPositive: false,
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FinancialChart
          title="Monthly Overview"
          type="bar"
          data={monthlyOverviewData}
          colors={["#0466C8", "#FF9500"]}
          dataKey="income"
          additionalDataKeys={["expenses"]}
        />

        <FinancialChart
          title="Expense Breakdown"
          type="pie"
          data={expensesByCategoryData}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FinancialChart
          title="Savings Growth"
          type="area"
          data={savingsData}
          colors={["#38B000"]}
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardOverviewData?.transactions
                .slice(0, 5)
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}{" "}
                        • {transaction.category}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "font-medium",
                        transaction.type === "income"
                          ? "text-finance-green"
                          : "text-foreground"
                      )}
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
    </div>
  );
};

export default DashboardOverview;
