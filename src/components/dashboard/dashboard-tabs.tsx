"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/dashboard/dashboard-overview";
import ExpenseTracker from "@/components/dashboard/ExpenseTracker";
import InvestmentCalculator from "@/components/dashboard/InvestmentCalculator";
import TaxCalculator from "@/components/dashboard/tax-calculator/TaxCalculator";
import {
  DashboardOverviewData,
  TransactionData,
  FinancialGoal,
} from "@/lib/get-dashboard-data";

export const metadata = {
  title: "Dashboard",
};

interface DashboardTabsProps {
  dashboardOverviewData: DashboardOverviewData;
  dashboardTransactionsData: TransactionData;
  dashboardFinancialGoalsData: FinancialGoal[];
}

export default function DashboardTabs({
  dashboardOverviewData,
  dashboardTransactionsData,
  dashboardFinancialGoalsData,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs
          defaultValue="tax"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="tax">Tax Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview dashboardOverviewData={dashboardOverviewData} />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpenseTracker
              dashboardTransactionsData={dashboardTransactionsData}
            />
          </TabsContent>

          <TabsContent value="investments">
            <InvestmentCalculator
              dashboardFinancialGoalsData={dashboardFinancialGoalsData}
            />
          </TabsContent>

          <TabsContent value="tax">
            <TaxCalculator />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Tax Calculation for Assessment Year 2026-27. Data is based on Union
            Budget 2025-26.
          </p>
          <p className="mt-1">
            This application is for educational purposes only. Please consult a
            tax professional for official advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
