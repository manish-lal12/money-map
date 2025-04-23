"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { ProfileInfo } from "@/components/profile-info";
import { FinancialSummary } from "@/components/financial-summary";
import { SecuritySettings } from "@/components/security-settings";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <PageHeader
        heading="Profile"
        text="Manage your profile information and account settings"
      />
      <div className="space-y-4">
        <Tabs
          defaultValue="profile"
          className="space-y-4 p-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-3 lg:w-[580px] px-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="financial">Financial Summary</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <ProfileInfo />
          </TabsContent>
          <TabsContent value="financial" className="space-y-4">
            <FinancialSummary />
          </TabsContent>
          <TabsContent value="security" className="space-y-4">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
