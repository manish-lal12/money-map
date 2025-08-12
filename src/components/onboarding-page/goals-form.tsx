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
  CheckIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GoalsFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export function GoalsForm({ onBack, onSubmit }: GoalsFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "savingGoals",
  });

  const addGoal = () => {
    append({
      name: "",
      amount: 0,
      description: "",
      duration: 12,
    });
  };
  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Card className="border border-slate-200 bg-slate-50">
        <CardContent className="pt-6">
          {fields.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">You haven't added any saving goals yet.</p>
              <Button
                type="button"
                onClick={addGoal}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add Your First Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-slate-700">
                      Goal #{index + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={control}
                      name={`savingGoals.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goal Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g., New Car, Vacation, Emergency Fund"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`savingGoals.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Write about your goal</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="I want to buy this car to enrich my car collection"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`savingGoals.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Amount</FormLabel>
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

                    <FormField
                      control={control}
                      name={`savingGoals.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (months)</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value.toString()}
                              onValueChange={(value) =>
                                field.onChange(Number.parseInt(value))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                {[3, 6, 12, 24, 36, 48, 60].map((months) => (
                                  <SelectItem
                                    key={months}
                                    value={months.toString()}
                                  >
                                    {months} {months === 1 ? "month" : "months"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addGoal}
                className="w-full border-dashed border-slate-300 text-slate-600"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add Another Goal
              </Button>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            >
              Complete <CheckIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
