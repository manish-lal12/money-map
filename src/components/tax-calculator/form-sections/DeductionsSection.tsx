
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Calculator, Home, UserPlus, Landmark, IndianRupee, Umbrella, Award, Bookmark } from "lucide-react";
import BookOpen from '@/components/icons/BookOpen';
import { useTaxData } from '../TaxDataContext';
import { formatCurrency } from '@/utils/financialUtils';

interface DeductionsSectionProps {
  onCalculate: () => void;
}

const DeductionsSection: React.FC<DeductionsSectionProps> = ({ onCalculate }) => {
  const {
    selectedRegime,
    hasHomeLoan,
    setHasHomeLoan,
    standardDeduction,
    setStandardDeduction,
    hasOtherDeductions,
    setHasOtherDeductions,
    
    epfContribution,
    setEpfContribution,
    ppfInvestment,
    setPpfInvestment,
    elssInvestment,
    setElssInvestment,
    lifeInsurance,
    setLifeInsurance,
    tuitionFees,
    setTuitionFees,
    otherEightyC,
    setOtherEightyC,
    section80C,
    
    section80D,
    setSection80D,
    section80G,
    setSection80G,
    section80TTA,
    setSection80TTA,
    nps,
    setNps,
    housingLoanInterest,
    setHousingLoanInterest,
    educationLoanInterest,
    setEducationLoanInterest,
    
    employmentType,
    setEmploymentType,
    employerNpsContribution,
    setEmployerNpsContribution,
    
    tdsPaid,
    setTdsPaid,
    tcsPaid,
    setTcsPaid,
    
    calculatorMode
  } = useTaxData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Deductions & Tax Payments</CardTitle>
        <CardDescription>Add your eligible deductions under various sections</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center space-x-2">
          <Switch
            id="standard-deduction"
            checked={standardDeduction}
            onCheckedChange={setStandardDeduction}
          />
          <Label htmlFor="standard-deduction">
            Standard Deduction 
            ({selectedRegime === 'old' ? '₹50,000' : '₹75,000'})
          </Label>
        </div>

        {selectedRegime === 'old' && (
          <div className="flex items-center space-x-2">
            <Switch
              id="has-other-deductions"
              checked={hasOtherDeductions}
              onCheckedChange={setHasOtherDeductions}
            />
            <Label htmlFor="has-other-deductions">I have Chapter VI-A deductions (80C, 80D, etc.)</Label>
          </div>
        )}

        {selectedRegime === 'old' && hasOtherDeductions && (
          <Tabs defaultValue="80c" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="80c">Section 80C</TabsTrigger>
              <TabsTrigger value="other">Other Deductions</TabsTrigger>
              <TabsTrigger value="loan">Loan & Employment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="80c" className="space-y-4">
              <div>
                <Label htmlFor="epf-contribution">EPF Contribution</Label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="epf-contribution"
                    type="number"
                    value={epfContribution}
                    onChange={(e) => setEpfContribution(parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ppf-investment">PPF Investment</Label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="ppf-investment"
                    type="number"
                    value={ppfInvestment}
                    onChange={(e) => setPpfInvestment(parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="elss-investment">ELSS/Tax Saving Mutual Funds</Label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="elss-investment"
                    type="number"
                    value={elssInvestment}
                    onChange={(e) => setElssInvestment(parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="life-insurance">Life Insurance Premium</Label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="life-insurance"
                    type="number"
                    value={lifeInsurance}
                    onChange={(e) => setLifeInsurance(parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
              </div>
              
              {calculatorMode === 'advanced' && (
                <>
                  <div>
                    <Label htmlFor="tuition-fees">Children Tuition Fees</Label>
                    <div className="relative mt-1">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tuition-fees"
                        type="number"
                        value={tuitionFees}
                        onChange={(e) => setTuitionFees(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="other-80c">Other 80C Investments</Label>
                    <div className="relative mt-1">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="other-80c"
                        type="number"
                        value={otherEightyC}
                        onChange={(e) => setOtherEightyC(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Total 80C</p>
                    <p className="text-xs text-muted-foreground">Maximum deduction ₹1,50,000</p>
                  </div>
                  <div>
                    <span className={`text-sm font-bold ${section80C > 150000 ? 'text-finance-warning' : ''}`}>
                      {formatCurrency(section80C)}
                    </span>
                    {section80C > 150000 && (
                      <p className="text-xs text-finance-warning">Limited to ₹1,50,000</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="other" className="space-y-4">
              <div>
                <Label htmlFor="section-80d">
                  Section 80D - Health Insurance Premium
                </Label>
                <div className="relative mt-1">
                  <Umbrella className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="section-80d"
                    type="number"
                    value={section80D}
                    onChange={(e) => setSection80D(parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Max deduction: ₹25,000 (₹50,000 for senior citizens)
                </p>
              </div>

              <div>
                <Label htmlFor="nps-contribution">
                  Section 80CCD(1B) - NPS Contribution
                </Label>
                <div className="relative mt-1">
                  <Bookmark className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nps-contribution"
                    type="number"
                    value={nps}
                    onChange={(e) => setNps(parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Additional deduction up to ₹50,000
                </p>
              </div>

              {calculatorMode === 'advanced' && (
                <>
                  <div>
                    <Label htmlFor="section-80g">
                      Section 80G - Donations
                    </Label>
                    <div className="relative mt-1">
                      <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="section-80g"
                        type="number"
                        value={section80G}
                        onChange={(e) => setSection80G(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="section-80tta">
                      Section 80TTA - Savings Interest
                    </Label>
                    <div className="relative mt-1">
                      <Landmark className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="section-80tta"
                        type="number"
                        value={section80TTA}
                        onChange={(e) => setSection80TTA(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Interest from savings account, max ₹10,000
                    </p>
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="loan" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="has-home-loan"
                  checked={hasHomeLoan}
                  onCheckedChange={setHasHomeLoan}
                />
                <Label htmlFor="has-home-loan">I have a home loan</Label>
              </div>
              
              {hasHomeLoan && (
                <div className="ml-6 space-y-3 border-l-2 border-muted pl-4">
                  <div>
                    <Label htmlFor="housing-loan-interest">
                      Section 24 - Housing Loan Interest
                    </Label>
                    <div className="relative mt-1">
                      <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="housing-loan-interest"
                        type="number"
                        value={housingLoanInterest}
                        onChange={(e) => setHousingLoanInterest(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max deduction: ₹2,00,000 for self-occupied property
                    </p>
                  </div>
                </div>
              )}

              {calculatorMode === 'advanced' && (
                <>
                  <div>
                    <Label htmlFor="education-loan-interest">
                      Section 80E - Education Loan Interest
                    </Label>
                    <div className="relative mt-1">
                      <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="education-loan-interest"
                        type="number"
                        value={educationLoanInterest}
                        onChange={(e) => setEducationLoanInterest(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      No upper limit, deduction available for 8 years
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="employment-type">Employment Type</Label>
                    <Select 
                      value={employmentType} 
                      onValueChange={(value) => setEmploymentType(value as 'private' | 'government')}
                    >
                      <SelectTrigger id="employment-type" className="mt-1">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private Sector</SelectItem>
                        <SelectItem value="government">Government Sector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="employer-nps">
                      Employer's NPS Contribution
                    </Label>
                    <div className="relative mt-1">
                      <UserPlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="employer-nps"
                        type="number"
                        value={employerNpsContribution}
                        onChange={(e) => setEmployerNpsContribution(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {employmentType === 'private' 
                        ? 'Deductible up to 14% of Basic Salary (private sector)' 
                        : 'Deductible up to 10% of Basic Salary (government)'}
                    </p>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        )}

        <Collapsible className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="outline" type="button" className="flex w-full justify-between">
              <span>TDS/TCS Paid</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div>
              <Label htmlFor="tds-paid">TDS (Tax Deducted at Source)</Label>
              <div className="relative mt-1">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="tds-paid"
                  type="number"
                  value={tdsPaid}
                  onChange={(e) => setTdsPaid(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="tcs-paid">TCS (Tax Collected at Source)</Label>
              <div className="relative mt-1">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="tcs-paid"
                  type="number"
                  value={tcsPaid}
                  onChange={(e) => setTcsPaid(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={onCalculate}
        >
          <Calculator className="h-5 w-5 mr-2" />
          Calculate Tax
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeductionsSection;
