import ProfileTabs from "@/components/profile/profile-tabs";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <ProfileTabs />
    </div>
  );
}
