"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { format } from "date-fns";
import type { OnboardingFormValues } from "@/components/onboarding-page/onboarding-form";

interface IncomeFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function IncomeForm({ onNext, onBack }: IncomeFormProps) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "monthlyIncome",
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger("monthlyIncome");
    if (isValid) {
      console.log("valid");
      onNext();
    } else {
      console.log("Validation errors:", errors);
    }
  };

  const addPreviousMonth = () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - fields.length);

    append({
      month: lastMonth,
      amount: 0,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="border border-slate-200 bg-slate-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {fields.map((field, index) => {
              const monthDate = new Date(field.month);
              const isCurrentMonth = index === 0;
              const monthLabel = isCurrentMonth
                ? "Current Month"
                : index === 1
                ? "Previous Month"
                : format(monthDate, "MMMM yyyy");

              return (
                <div key={field.id} className="p-4 border rounded-md bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-slate-700">{monthLabel}</h3>
                    {!isCurrentMonth && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={control}
                    name={`monthlyIncome.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Income Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                              &#8377;
                            </span>
                            <Input
                              {...field}
                              type="number"
                              placeholder="0.00"
                              className="pl-8"
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseFloat(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addPreviousMonth}
            className="mt-4 w-full border-dashed border-slate-300 text-slate-600"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add Previous Month
          </Button>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Next <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
