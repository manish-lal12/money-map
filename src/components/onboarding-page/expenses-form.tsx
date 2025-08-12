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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
  Trash2Icon,
} from "lucide-react";
import { format } from "date-fns";
import type { OnboardingFormValues } from "@/components/onboarding-page/onboarding-form";
import { ExpensesCategory } from "@/schemas/onboarding-schema";

interface ExpensesFormProps {
  onNext: () => void;
  onBack: () => void;
}

function MonthExpenses({
  control,
  monthIndex,
  field,
  removeMonth,
  isCurrentMonth,
  monthLabel,
}: {
  control: any;
  monthIndex: number;
  field: any;
  removeMonth: (index: number) => void;
  isCurrentMonth: boolean;
  monthLabel: string;
}) {
  const {
    fields: expenses,
    append: appendExpense,
    remove: removeExpense,
  } = useFieldArray({
    control,
    name: `monthlyExpenses.${monthIndex}.expenses`,
  });

  return (
    <div key={field.id} className="p-4 border rounded-md bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-slate-700">{monthLabel}</h3>
        {!isCurrentMonth && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeMonth(monthIndex)}
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      {expenses.map((expense, index) => (
        <div key={expense.id} className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 mb-4">
            <FormField
              control={control}
              name={`monthlyExpenses.${monthIndex}.expenses.${index}.amount`}
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        $
                      </span>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`monthlyExpenses.${monthIndex}.expenses.${index}.category`}
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.values(ExpensesCategory.enum).map(
                            (category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() +
                                  category.slice(1)}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center col-span-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeExpense(index)}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              appendExpense({
                amount: 0,
                category: ExpensesCategory.enum.miscellaneous,
              })
            }
            className="w-auto ml-auto"
          >
            <PlusIcon className="h-4 w-4" />
            Add expense
          </Button>
        </div>
      ))}
    </div>
  );
}

export function ExpensesForm({ onNext, onBack }: ExpensesFormProps) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  // Manage the monthlyExpenses array
  const {
    fields: months,
    append: appendMonth,
    remove: removeMonth,
  } = useFieldArray({
    control,
    name: "monthlyExpenses",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger("monthlyExpenses");
    if (isValid) {
      onNext();
    }
  };

  const addPreviousMonth = () => {
    const baseDate = months.length
      ? new Date(months[months.length - 1].month as any)
      : new Date();
    const previousMonth = new Date(baseDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    appendMonth({
      month: previousMonth,
      expenses: [
        {
          amount: 0,
          category: ExpensesCategory.enum.miscellaneous,
        },
      ],
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="border border-slate-200 bg-slate-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {months.map((field, monthIndex) => {
              const monthDate = new Date(field.month);
              const isCurrentMonth = monthIndex === 0;
              const monthLabel = isCurrentMonth
                ? "Current Month"
                : monthIndex === 1
                ? "Previous Month"
                : format(monthDate, "MMMM yyyy");

              return (
                <MonthExpenses
                  key={field.id}
                  control={control}
                  monthIndex={monthIndex}
                  field={field}
                  removeMonth={removeMonth}
                  isCurrentMonth={isCurrentMonth}
                  monthLabel={monthLabel}
                />
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
