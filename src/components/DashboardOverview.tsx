
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from './StatCard';
import FinancialChart from './FinancialChart';
import { formatCurrency, sampleTransactions, expenseCategories } from '@/utils/financialUtils';
import { ArrowUpRight, Wallet, CreditCard, Landmark, PiggyBank } from 'lucide-react';
import { cn } from "@/lib/utils";

const DashboardOverview: React.FC = () => {
  // Calculate overview stats
  const totalBalance = 350000;
  const totalIncome = 100000;
  const totalExpenses = 46500;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
  
  // Prepare data for charts
  const expensesByCategoryData = [
    { name: 'Housing', value: 25000, color: '#0466C8' },
    { name: 'Food', value: 6000, color: '#38B000' },
    { name: 'Utilities', value: 4000, color: '#FF9500' },
    { name: 'Investments', value: 10000, color: '#277DA1' },
    { name: 'Entertainment', value: 1500, color: '#F72585' }
  ];
  
  // Format data in the required shape for the FinancialChart component
  const monthlyOverviewData = [
    { name: 'Jan', value: 95000, income: 95000, expenses: 42000 },
    { name: 'Feb', value: 98000, income: 98000, expenses: 45000 },
    { name: 'Mar', value: 97000, income: 97000, expenses: 44000 },
    { name: 'Apr', value: 100000, income: 100000, expenses: 46500 }
  ];
  
  const savingsData = [
    { name: 'Jan', value: 53000 },
    { name: 'Feb', value: 53000 },
    { name: 'Mar', value: 53000 },
    { name: 'Apr', value: 53500 }
  ];
  
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
          value={formatCurrency(totalIncome)}
          icon={ArrowUpRight}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard 
          title="Monthly Expenses" 
          value={formatCurrency(totalExpenses)}
          icon={CreditCard}
          trend={{ value: 1.5, isPositive: false }}
        />
        <StatCard 
          title="Savings Rate" 
          value={`${savingsRate.toFixed(1)}%`}
          icon={PiggyBank}
          description="Monthly savings percentage"
          trend={{ value: 4.2, isPositive: true }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <FinancialChart
          title="Monthly Overview"
          type="bar"
          data={monthlyOverviewData}
          colors={['#0466C8', '#FF9500']}
          dataKey="income"
          additionalDataKeys={['expenses']}
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
          colors={['#38B000']}
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short' 
                      })} • {transaction.category}
                    </p>
                  </div>
                  <p className={cn(
                    "font-medium",
                    transaction.type === 'income' ? 'text-finance-green' : 'text-foreground'
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
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
