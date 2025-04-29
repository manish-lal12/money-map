import DashboardTabs from "@/components/dashboard/dashboard-tabs";
import ChatBot from "@/components/chatBot";
export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-6">
        <DashboardTabs />
      <ChatBot />
      </main>
    </div>
  );
}
