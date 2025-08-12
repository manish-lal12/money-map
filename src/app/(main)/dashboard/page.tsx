import DashboardTabs from "@/components/dashboard/dashboard-tabs";
import ChatBot from "@/components/chatBot";
import {
  getDashboardData,
  getTransactions,
  getFinancialGoals,
} from "@/lib/get-dashboard-data";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();
  // const transactionsData = await getTransactions();
  if (!dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Error fetching dashboard data</h1>
      </div>
    );
  }
  const { transactions, monthlyOverviewData, expensesByCategoryData } =
    dashboardData;
  const transactionsData = {
    transactions,
    monthlyOverviewData,
    expensesByCategoryData,
  };
  const financialGoalsData = await getFinancialGoals();
  console.log(dashboardData);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-6">
        <DashboardTabs
          dashboardOverviewData={dashboardData!}
          dashboardTransactionsData={transactionsData}
          dashboardFinancialGoalsData={financialGoalsData!}
        />
      </main>
    </div>
  );
}
