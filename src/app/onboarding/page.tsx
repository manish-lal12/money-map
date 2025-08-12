import { OnBoardingForm } from "@/components/onboarding-page/onboarding-form";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-3xl">
        <SessionProvider>
          <OnBoardingForm />
        </SessionProvider>
      </div>
    </main>
  );
}
