import ProfileTabs from "@/components/profile/profile-tabs";
import { getProfile } from "@/app/actions/profile";
import { getFinancialGoals } from "@/lib/get-dashboard-data";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const response = await getProfile();
  const { data: userDetails } = response;
  if (!userDetails) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Error, fetching user details</h1>
      </div>
    );
  }

  const userGoals = await getFinancialGoals();
  if (!userGoals) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Error, fetching user goals</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ProfileTabs
        userProfileDetails={userDetails}
        userFinancialGoals={userGoals}
      />
    </div>
  );
}
