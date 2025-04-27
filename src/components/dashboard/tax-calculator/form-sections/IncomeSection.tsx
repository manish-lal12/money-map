
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IndianRupee } from "lucide-react";
import { useTaxData } from '../TaxDataContext';
import { formatCurrency } from '@/utils/financialUtils';

const IncomeSection: React.FC = () => {
  const {
    salaryIncome,
    setSalaryIncome,
    basicSalary,
    setBasicSalary,
    hasOtherIncome,
    setHasOtherIncome,
    otherIncome,
    setOtherIncome,
    rentalIncome,
    setRentalIncome,
    businessIncome,
    setBusinessIncome,
    capitalGains,
    setCapitalGains,
    receivesHRA,
    setReceivesHRA,
    hraAmount,
    setHraAmount,
    rentPaid,
    setRentPaid,
    isMetroCity,
    setIsMetroCity,
    calculatorMode,
    totalIncome
  } = useTaxData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Income Details</CardTitle>
        <CardDescription>Enter your annual income details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="salary-income">
            Salary Income (per annum)
          </Label>
          <div className="relative mt-1">
            <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="salary-income"
              type="number"
              value={salaryIncome}
              onChange={(e) => setSalaryIncome(parseFloat(e.target.value) || 0)}
              className="pl-10"
              placeholder="0"
            />
          </div>
          {calculatorMode === 'advanced' && (
            <div className="mt-3">
              <Label htmlFor="basic-salary">Basic Salary Component</Label>
              <div className="relative mt-1">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="basic-salary"
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Basic salary is used for HRA exemption calculation
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="other-income"
            checked={hasOtherIncome}
            onCheckedChange={setHasOtherIncome}
          />
          <Label htmlFor="other-income">I have income from other sources</Label>
        </div>

        {hasOtherIncome && (
          <div className="space-y-3 pl-6 border-l-2 border-muted">
            <div>
              <Label htmlFor="other-income-amount">
                Other Income (Interest, etc.)
              </Label>
              <div className="relative mt-1">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="other-income-amount"
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0"
                />
              </div>
            </div>

            {calculatorMode === 'advanced' && (
              <>
                <div>
                  <Label htmlFor="rental-income">Income from House Property</Label>
                  <div className="relative mt-1">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="rental-income"
                      type="number"
                      value={rentalIncome}
                      onChange={(e) => setRentalIncome(parseFloat(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="business-income">Business/Professional Income</Label>
                  <div className="relative mt-1">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="business-income"
                      type="number"
                      value={businessIncome}
                      onChange={(e) => setBusinessIncome(parseFloat(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="capital-gains">Capital Gains</Label>
                  <div className="relative mt-1">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="capital-gains"
                      type="number"
                      value={capitalGains}
                      onChange={(e) => setCapitalGains(parseFloat(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="0"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id="receives-hra"
            checked={receivesHRA}
            onCheckedChange={setReceivesHRA}
          />
          <Label htmlFor="receives-hra">I receive HRA (House Rent Allowance)</Label>
        </div>

        {receivesHRA && (
          <div className="space-y-3 pl-6 border-l-2 border-muted">
            <div>
              <Label htmlFor="hra-amount">Annual HRA Received</Label>
              <div className="relative mt-1">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="hra-amount"
                  type="number"
                  value={hraAmount}
                  onChange={(e) => setHraAmount(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rent-paid">Annual Rent Paid</Label>
              <div className="relative mt-1">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="rent-paid"
                  type="number"
                  value={rentPaid}
                  onChange={(e) => setRentPaid(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="metro-city"
                checked={isMetroCity}
                onCheckedChange={setIsMetroCity}
              />
              <Label htmlFor="metro-city">I live in a metro city (Delhi, Mumbai, Chennai, Kolkata)</Label>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-finance-blue/5 rounded-lg">
          <p className="text-sm font-medium">Total Gross Income: {formatCurrency(totalIncome)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeSection;
