"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AssetsForm } from "@/components/onboarding-page/assets-form";
import { IncomeForm } from "@/components/onboarding-page/income-form";
import { GoalsForm } from "@/components/onboarding-page/goals-form";
import { ExpensesForm } from "@/components/onboarding-page/expenses-form";
import { FormStepper } from "@/components/onboarding-page/form-stepper";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormSchema } from "@/schemas/onboarding-schema";
import { ExpensesCategory } from "@/schemas/onboarding-schema";
import { handleOnboarding } from "@/app/actions/save-onboarding-data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { z } from "zod";

export type OnboardingFormValues = z.infer<typeof OnboardingFormSchema>;

export function OnBoardingForm() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { update } = useSession();

  const formMethods = useForm<OnboardingFormValues>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      totalAssets: 0,
      monthlyIncome: [{ month: new Date(), amount: 0 }],
      savingGoals: [
        { name: "Default Goal", description: "", amount: 0, duration: 0 },
      ],
      monthlyExpenses: [
        {
          month: new Date(),
          expenses: [
            { amount: 0, category: ExpensesCategory.enum.miscellaneous },
          ],
        },
      ],
    },
    mode: "onChange",
  });

  const steps = [
    { title: "Your Assets", description: "Let's start with your total assets" },
    { title: "Monthly Income", description: "Tell us about your income" },
    { title: "Monthly Expenses", description: "Track your spending" },
    { title: "Saving Goals", description: "What are you saving for?" },
  ];

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <AssetsForm onNext={nextStep} />;
      case 1:
        return <IncomeForm onNext={nextStep} onBack={prevStep} />;
      case 2:
        return <ExpensesForm onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <GoalsForm onBack={prevStep} onSubmit={handleSubmit} />;
      default:
        return <AssetsForm onNext={nextStep} />;
    }
  };

  const handleSubmit = async (data: OnboardingFormValues) => {
    try {
      await handleOnboarding(data);
      await update({ isOnboarded: true });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Card className="w-full shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-slate-800">
            {steps[step].title}
          </CardTitle>
          <CardDescription>{steps[step].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormStepper currentStep={step} steps={steps.map((s) => s.title)} />
          <div className="mt-6">{renderStep()}</div>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
