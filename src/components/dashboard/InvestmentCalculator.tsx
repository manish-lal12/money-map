import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, calculateSIPReturns } from "@/utils/financialUtils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CreditCard, Landmark, Calculator, TrendingUp } from "lucide-react";

const InvestmentCalculator: React.FC = () => {
  // SIP Calculator
  const [sipAmount, setSipAmount] = useState<number>(10000);
  const [sipDuration, setSipDuration] = useState<number>(10);
  const [sipReturn, setSipReturn] = useState<number>(12);
  const [sipMaturityAmount, setSipMaturityAmount] = useState<number>(0);
  const [sipInvestedAmount, setSipInvestedAmount] = useState<number>(0);
  const [sipWealthGained, setSipWealthGained] = useState<number>(0);

  // Goal Planner
  const [goalAmount, setGoalAmount] = useState<number>(1000000);
  const [goalDuration, setGoalDuration] = useState<number>(5);
  const [goalReturn, setGoalReturn] = useState<number>(12);
  const [requiredMonthlyInvestment, setRequiredMonthlyInvestment] =
    useState<number>(0);

  useEffect(() => {
    // Calculate SIP results
    const maturityAmount = calculateSIPReturns(
      sipAmount,
      sipDuration,
      sipReturn
    );
    const totalInvestment = sipAmount * sipDuration * 12;

    setSipMaturityAmount(maturityAmount);
    setSipInvestedAmount(totalInvestment);
    setSipWealthGained(maturityAmount - totalInvestment);

    // Calculate required monthly investment for goal
    const monthlyRate = goalReturn / 12 / 100;
    const months = goalDuration * 12;
    const monthlyInvestment =
      (goalAmount * monthlyRate) /
      ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));

    setRequiredMonthlyInvestment(Math.round(monthlyInvestment));
  }, [sipAmount, sipDuration, sipReturn, goalAmount, goalDuration, goalReturn]);

  // Generate year-by-year growth data for SIP
  const getSIPGrowthData = () => {
    const data = [];
    let total = 0;
    const monthlyRate = sipReturn / 12 / 100;

    for (let year = 1; year <= sipDuration; year++) {
      const yearlyInvestment = sipAmount * 12;
      let currentValue = 0;

      if (year === 1) {
        // First year calculation
        for (let month = 1; month <= 12; month++) {
          currentValue = (sipAmount + currentValue) * (1 + monthlyRate);
        }
      } else {
        // Subsequent years
        currentValue =
          total * (1 + monthlyRate) ** 12 +
          sipAmount *
            ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) *
            (1 + monthlyRate);
      }

      total = currentValue;
      data.push({
        name: `Year ${year}`,
        invested: yearlyInvestment * year,
        value: Math.round(currentValue),
      });
    }

    return data;
  };

  const sipGrowthData = getSIPGrowthData();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Investment Planning</h2>

      <Tabs defaultValue="sip" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
          <TabsTrigger value="goal">Goal-based Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="sip" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SIP Calculator</CardTitle>
                <CardDescription>
                  Calculate returns on your monthly investments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Monthly Investment
                    </label>
                    <span className="text-sm font-medium">
                      {formatCurrency(sipAmount)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSipAmount(Math.max(1000, sipAmount - 1000))
                      }
                    >
                      -
                    </Button>
                    <Slider
                      value={[sipAmount]}
                      min={1000}
                      max={100000}
                      step={1000}
                      onValueChange={(values) => setSipAmount(values[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSipAmount(Math.min(100000, sipAmount + 1000))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Time Period (Years)
                    </label>
                    <span className="text-sm font-medium">
                      {sipDuration} years
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSipDuration(Math.max(1, sipDuration - 1))
                      }
                    >
                      -
                    </Button>
                    <Slider
                      value={[sipDuration]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(values) => setSipDuration(values[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSipDuration(Math.min(30, sipDuration + 1))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Expected Return Rate (%)
                    </label>
                    <span className="text-sm font-medium">{sipReturn}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSipReturn(Math.max(1, sipReturn - 1))}
                    >
                      -
                    </Button>
                    <Slider
                      value={[sipReturn]}
                      min={1}
                      max={30}
                      step={0.5}
                      onValueChange={(values) => setSipReturn(values[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSipReturn(Math.min(30, sipReturn + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="h-px w-full bg-border my-4" />

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">
                      Invested Amount
                    </p>
                    <p className="text-lg font-bold">
                      {formatCurrency(sipInvestedAmount)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-finance-blue/10">
                    <p className="text-xs text-muted-foreground">
                      Wealth Gained
                    </p>
                    <p className="text-lg font-bold text-finance-blue">
                      {formatCurrency(sipWealthGained)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-finance-green/10">
                    <p className="text-xs text-muted-foreground">Total Value</p>
                    <p className="text-lg font-bold text-finance-green">
                      {formatCurrency(sipMaturityAmount)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Growth Projection</CardTitle>
                <CardDescription>
                  Year-by-year growth of your investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={sipGrowthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        if (value >= 10000000)
                          return `${(value / 10000000).toFixed(1)}Cr`;
                        if (value >= 100000)
                          return `${(value / 100000).toFixed(1)}L`;
                        if (value >= 1000)
                          return `${(value / 1000).toFixed(0)}K`;
                        return value;
                      }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(value as number),
                        "",
                      ]}
                      labelStyle={{ fontWeight: "bold" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="invested"
                      name="Amount Invested"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Future Value"
                      stroke="#38B000"
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg text-sm">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-finance-blue mr-2" />
                    <h4 className="font-medium">Investment Insight</h4>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    With a monthly SIP of {formatCurrency(sipAmount)} for{" "}
                    {sipDuration} years, your investment can grow to{" "}
                    {formatCurrency(sipMaturityAmount)}, yielding a gain of{" "}
                    {formatCurrency(sipWealthGained)}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goal" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal-based Planner</CardTitle>
                <CardDescription>
                  Calculate how much you need to invest to reach your financial
                  goal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Goal Amount</label>
                    <span className="text-sm font-medium">
                      {formatCurrency(goalAmount)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setGoalAmount(Math.max(100000, goalAmount - 100000))
                      }
                    >
                      -
                    </Button>
                    <Slider
                      value={[goalAmount]}
                      min={100000}
                      max={10000000}
                      step={100000}
                      onValueChange={(values) => setGoalAmount(values[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setGoalAmount(Math.min(10000000, goalAmount + 100000))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Time Period (Years)
                    </label>
                    <span className="text-sm font-medium">
                      {goalDuration} years
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setGoalDuration(Math.max(1, goalDuration - 1))
                      }
                    >
                      -
                    </Button>
                    <Slider
                      value={[goalDuration]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(values) => setGoalDuration(values[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setGoalDuration(Math.min(30, goalDuration + 1))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Expected Return Rate (%)
                    </label>
                    <span className="text-sm font-medium">{goalReturn}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGoalReturn(Math.max(1, goalReturn - 1))}
                    >
                      -
                    </Button>
                    <Slider
                      value={[goalReturn]}
                      min={1}
                      max={30}
                      step={0.5}
                      onValueChange={(values) => setGoalReturn(values[0])}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setGoalReturn(Math.min(30, goalReturn + 1))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-finance-green/10 rounded-lg">
                  <h3 className="text-lg font-bold text-finance-green">
                    {formatCurrency(requiredMonthlyInvestment)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Monthly investment required to reach your goal of{" "}
                    {formatCurrency(goalAmount)} in {goalDuration} years
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center">
                    <Calculator className="h-4 w-4 text-finance-blue mr-2" />
                    <h4 className="font-medium">Goal Planning Tips</h4>
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>
                      Start early to benefit from the power of compounding
                    </li>
                    <li>
                      Increase your SIP amount annually to counter inflation
                    </li>
                    <li>
                      Consider diversifying across equity and debt based on your
                      goal timeframe
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Common Financial Goals
                </CardTitle>
                <CardDescription>
                  Popular financial goals and planning tips
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-finance-blue/10 flex items-center justify-center mr-3">
                      <Landmark className="h-5 w-5 text-finance-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Home Purchase</h4>
                      <p className="text-sm text-muted-foreground">
                        Saving for down payment on a house
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p>Typical Goal: ₹20,00,000 to ₹50,00,000</p>
                    <p>Recommended Timeframe: 5-7 years</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        setGoalAmount(3000000);
                        setGoalDuration(7);
                        setGoalReturn(12);
                      }}
                    >
                      Use This Goal
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-finance-green/10 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-finance-green" />
                    </div>
                    <div>
                      <h4 className="font-medium">Child&apos;s Education</h4>
                      <p className="text-sm text-muted-foreground">
                        Saving for higher education expenses
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p>Typical Goal: ₹15,00,000 to ₹50,00,000</p>
                    <p>Recommended Timeframe: 10-15 years</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        setGoalAmount(2500000);
                        setGoalDuration(15);
                        setGoalReturn(12);
                      }}
                    >
                      Use This Goal
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-finance-blue/10 flex items-center justify-center mr-3">
                      <Calculator className="h-5 w-5 text-finance-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Retirement Planning</h4>
                      <p className="text-sm text-muted-foreground">
                        Building a retirement corpus
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p>Typical Goal: ₹1,00,00,000 to ₹3,00,00,000</p>
                    <p>Recommended Timeframe: 20-30 years</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        setGoalAmount(20000000);
                        setGoalDuration(25);
                        setGoalReturn(12);
                      }}
                    >
                      Use This Goal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentCalculator;
