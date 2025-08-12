"use client";

import { useFormContext } from "react-hook-form";
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
import { ArrowRightIcon } from "lucide-react";
import React from "react";

interface AssetsFormProps {
  onNext: () => void;
}

export function AssetsForm({ onNext }: AssetsFormProps) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger("totalAssets");
    if (isValid) {
      console.log("valid");
      onNext();
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="border border-slate-200 bg-slate-50">
        <CardContent className="pt-6">
          <FormField
            control={control}
            name="totalAssets"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-base font-medium">
                  Total Assets
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      ₹
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? 0
                            : Number.parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-6">
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
