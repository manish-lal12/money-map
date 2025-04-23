"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/DashboardOverview";
import ExpenseTracker from "@/components/ExpenseTracker";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import TaxCalculator from "@/components/TaxCalculator";

export default function DashboardPage() {
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
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpenseTracker />
          </TabsContent>

          <TabsContent value="investments">
            <InvestmentCalculator />
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
