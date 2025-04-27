import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Download,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/financialUtils";
import { useTaxData } from "./TaxDataContext";
import FinancialChart from "../FinancialChart";

const TaxCalculatorResults: React.FC = () => {
  const {
    selectedRegime,
    assessmentYear,
    ageGroup,
    residentialStatus,

    oldRegimeTotal,
    newRegimeTotal,
    oldRegimeFinalLiability,
    newRegimeFinalLiability,
    oldRegimeTaxableIncome,
    newRegimeTaxableIncome,
    oldRegimeRebate,
    newRegimeRebate,
    oldRegimeMarginalRelief,
    newRegimeMarginalRelief,

    taxSavings,
    betterRegime,
    oldRegimeBreakdown,
    newRegimeBreakdown,
    taxComparisonData,

    tdsPaid,
    tcsPaid,

    exportAsPDF,
    shareCalculation,
    getTaxRecommendations,
  } = useTaxData();

  const taxRecommendations = getTaxRecommendations();

  // Format age group for display
  const displayAgeGroup = {
    below60: "Below 60 years",
    "60to80": "60 to 80 years",
    above80: "Above 80 years",
  }[ageGroup];

  return (
    <div className="grid gap-6 md:grid-cols-2 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Tax Calculation Results</span>
            <span className="text-sm font-normal text-muted-foreground">
              AY {assessmentYear}
            </span>
          </CardTitle>
          <CardDescription>
            Comparison between old and new tax regimes
            <span className="block mt-1">
              Age: {displayAgeGroup} | Status:{" "}
              {residentialStatus === "resident" ? "Resident" : "Non-Resident"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className={cn(
                "flex-1 rounded-lg p-4 transition-colors",
                selectedRegime === "old"
                  ? "bg-finance-blue/5 border-2 border-finance-blue"
                  : "bg-muted"
              )}
            >
              <p className="text-sm font-medium">Old Regime Tax</p>
              <h4 className="text-2xl font-bold">
                {formatCurrency(oldRegimeTotal)}
              </h4>
              <p className="text-xs text-muted-foreground">
                Effective Rate:{" "}
                {oldRegimeTaxableIncome > 0
                  ? ((oldRegimeTotal / oldRegimeTaxableIncome) * 100).toFixed(2)
                  : 0}
                %
              </p>
              {tdsPaid + tcsPaid > 0 && (
                <p className="text-xs mt-1 font-medium">
                  Final Payable: {formatCurrency(oldRegimeFinalLiability)}
                </p>
              )}
            </div>

            <div
              className={cn(
                "flex-1 rounded-lg p-4 transition-colors",
                selectedRegime === "new"
                  ? "bg-finance-green/5 border-2 border-finance-green"
                  : "bg-muted"
              )}
            >
              <p className="text-sm font-medium">New Regime Tax</p>
              <h4 className="text-2xl font-bold">
                {formatCurrency(newRegimeTotal)}
              </h4>
              <p className="text-xs text-muted-foreground">
                Effective Rate:{" "}
                {newRegimeTaxableIncome > 0
                  ? ((newRegimeTotal / newRegimeTaxableIncome) * 100).toFixed(2)
                  : 0}
                %
              </p>
              {tdsPaid + tcsPaid > 0 && (
                <p className="text-xs mt-1 font-medium">
                  Final Payable: {formatCurrency(newRegimeFinalLiability)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                betterRegime === "new"
                  ? "bg-finance-green/10 text-finance-green"
                  : "bg-finance-blue/10 text-finance-blue"
              }`}
            >
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Recommended Tax Regime</p>
              <p className="text-sm">
                The{" "}
                <span className="font-bold">
                  {betterRegime === "new" ? "New" : "Old"} Regime
                </span>{" "}
                is better for you, saving{" "}
                <span className="font-bold text-finance-green">
                  {formatCurrency(taxSavings)}
                </span>
              </p>
            </div>
          </div>

          {(oldRegimeRebate > 0 ||
            newRegimeRebate > 0 ||
            oldRegimeMarginalRelief > 0 ||
            newRegimeMarginalRelief > 0) && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Tax Relief Applied</h4>
              <div className="space-y-1 text-sm">
                {oldRegimeRebate > 0 && (
                  <p>
                    • Old Regime: Rebate u/s 87A of{" "}
                    {formatCurrency(oldRegimeRebate)}
                  </p>
                )}
                {newRegimeRebate > 0 && (
                  <p>
                    • New Regime: Rebate u/s 87A of{" "}
                    {formatCurrency(newRegimeRebate)}
                  </p>
                )}
                {oldRegimeMarginalRelief > 0 && (
                  <p>
                    • Old Regime: Marginal relief of{" "}
                    {formatCurrency(oldRegimeMarginalRelief)}
                  </p>
                )}
                {newRegimeMarginalRelief > 0 && (
                  <p>
                    • New Regime: Marginal relief of{" "}
                    {formatCurrency(newRegimeMarginalRelief)}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-4">
            <FinancialChart
              title="Tax Regime Comparison"
              type="bar"
              data={taxComparisonData}
            />
          </div>

          <div className="pt-3 flex flex-wrap gap-2 md:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={exportAsPDF}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={shareCalculation}
              className="flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tax Breakdown & Tips</CardTitle>
          <CardDescription>
            Detailed breakdown and optimization tips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="space-y-4 pt-4">
              <div>
                <h3 className="font-medium text-sm mb-2">
                  Old Regime Breakdown
                </h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {oldRegimeBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium text-sm mb-2">
                  New Regime Breakdown
                </h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {newRegimeBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="pt-4">
              <div className="space-y-4">
                {taxRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-finance-blue/10 text-finance-blue flex items-center justify-center mr-2 mt-0.5">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}

                <div className="mt-4 p-4 bg-finance-blue/10 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-finance-blue mr-2" />
                    <h4 className="font-medium">Important Note</h4>
                  </div>
                  <p className="text-sm mt-2">
                    This is a simplified tax calculator for income tax
                    calculation based on FY 2025-26 guidelines. For complex tax
                    situations involving multiple income sources, capital gains,
                    or business income, please consult a tax professional.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCalculatorResults;
