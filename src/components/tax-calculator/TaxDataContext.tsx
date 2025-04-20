import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { formatCurrency } from '@/utils/financialUtils';
import { 
  calculateOldRegimeTax, 
  calculateNewRegimeTax, 
  calculateSurcharge, 
  calculateRebate,
  calculateHRAExemption,
  calculateMarginalRelief,
  formatIndianCurrency
} from '@/utils/taxCalculationUtils';

type EmploymentType = 'private' | 'government';
type AssessmentYear = '2024-25' | '2025-26' | '2026-27';
type CalculatorMode = 'simple' | 'advanced';
type TaxRegime = 'old' | 'new';
type AgeGroup = 'below60' | '60to80' | 'above80';
type ResidentialStatus = 'resident' | 'non-resident';

interface TaxDataContextType {
  // General settings
  calculatorMode: CalculatorMode;
  setCalculatorMode: (mode: CalculatorMode) => void;
  assessmentYear: AssessmentYear;
  setAssessmentYear: (year: AssessmentYear) => void;
  selectedRegime: TaxRegime;
  setSelectedRegime: (regime: TaxRegime) => void;
  ageGroup: AgeGroup;
  setAgeGroup: (age: AgeGroup) => void;
  residentialStatus: ResidentialStatus;
  setResidentialStatus: (status: ResidentialStatus) => void;
  
  // Income details
  salaryIncome: number;
  setSalaryIncome: (amount: number) => void;
  basicSalary: number;
  setBasicSalary: (amount: number) => void;
  hasOtherIncome: boolean;
  setHasOtherIncome: (has: boolean) => void;
  otherIncome: number;
  setOtherIncome: (amount: number) => void;
  rentalIncome: number;
  setRentalIncome: (amount: number) => void;
  businessIncome: number;
  setBusinessIncome: (amount: number) => void;
  capitalGains: number;
  setCapitalGains: (amount: number) => void;
  agricultureIncome: number;
  setAgricultureIncome: (amount: number) => void;
  totalIncome: number;
  
  // HRA and other flags
  receivesHRA: boolean;
  setReceivesHRA: (receives: boolean) => void;
  hraAmount: number;
  setHraAmount: (amount: number) => void;
  rentPaid: number;
  setRentPaid: (amount: number) => void;
  isMetroCity: boolean;
  setIsMetroCity: (is: boolean) => void;
  hasHomeLoan: boolean;
  setHasHomeLoan: (has: boolean) => void;
  
  // Exemptions
  hraExemption: number;
  setHraExemption: (amount: number) => void;
  lta: number;
  setLta: (amount: number) => void;
  professionalTax: number;
  setProfessionalTax: (amount: number) => void;
  otherExemptions: number;
  setOtherExemptions: (amount: number) => void;
  totalExemptions: number;
  
  // Standard deduction
  standardDeduction: boolean;
  setStandardDeduction: (has: boolean) => void;
  
  // Deductions
  hasOtherDeductions: boolean;
  setHasOtherDeductions: (has: boolean) => void;
  
  // 80C components
  epfContribution: number;
  setEpfContribution: (amount: number) => void;
  ppfInvestment: number;
  setPpfInvestment: (amount: number) => void;
  elssInvestment: number;
  setElssInvestment: (amount: number) => void;
  lifeInsurance: number;
  setLifeInsurance: (amount: number) => void;
  tuitionFees: number;
  setTuitionFees: (amount: number) => void;
  otherEightyC: number;
  setOtherEightyC: (amount: number) => void;
  section80C: number;
  
  // Other deductions
  section80D: number;
  setSection80D: (amount: number) => void;
  section80G: number;
  setSection80G: (amount: number) => void;
  section80TTA: number;
  setSection80TTA: (amount: number) => void;
  nps: number;
  setNps: (amount: number) => void;
  housingLoanInterest: number;
  setHousingLoanInterest: (amount: number) => void;
  educationLoanInterest: number;
  setEducationLoanInterest: (amount: number) => void;
  
  // Employment details
  employmentType: EmploymentType;
  setEmploymentType: (type: EmploymentType) => void;
  employerNpsContribution: number;
  setEmployerNpsContribution: (amount: number) => void;
  
  // TDS/TCS
  tdsPaid: number;
  setTdsPaid: (amount: number) => void;
  tcsPaid: number;
  setTcsPaid: (amount: number) => void;
  
  // Tax calculation results
  oldRegimeTaxableIncome: number;
  newRegimeTaxableIncome: number;
  oldRegimeTax: number;
  newRegimeTax: number;
  oldRegimeSurcharge: number;
  newRegimeSurcharge: number;
  oldRegimeCess: number;
  newRegimeCess: number;
  oldRegimeRebate: number;
  newRegimeRebate: number;
  oldRegimeMarginalRelief: number;
  newRegimeMarginalRelief: number;
  oldRegimeTotal: number;
  newRegimeTotal: number;
  oldRegimeFinalLiability: number;
  newRegimeFinalLiability: number;
  betterRegime: TaxRegime;
  taxSavings: number;
  
  // Breakdown data for charts and display
  oldRegimeBreakdown: { name: string; value: number }[];
  newRegimeBreakdown: { name: string; value: number }[];
  taxComparisonData: { name: string; value: number; color: string }[];
  
  // Functions
  exportAsPDF: () => void;
  shareCalculation: () => void;
  getTaxRecommendations: () => string[];
}

const defaultContext: TaxDataContextType = {
  calculatorMode: 'simple',
  setCalculatorMode: () => {},
  assessmentYear: '2026-27',
  setAssessmentYear: () => {},
  selectedRegime: 'new',
  setSelectedRegime: () => {},
  ageGroup: 'below60',
  setAgeGroup: () => {},
  residentialStatus: 'resident',
  setResidentialStatus: () => {},
  
  salaryIncome: 1000000,
  setSalaryIncome: () => {},
  basicSalary: 500000,
  setBasicSalary: () => {},
  hasOtherIncome: false,
  setHasOtherIncome: () => {},
  otherIncome: 0,
  setOtherIncome: () => {},
  rentalIncome: 0,
  setRentalIncome: () => {},
  businessIncome: 0,
  setBusinessIncome: () => {},
  capitalGains: 0,
  setCapitalGains: () => {},
  agricultureIncome: 0,
  setAgricultureIncome: () => {},
  totalIncome: 1000000,
  
  receivesHRA: false,
  setReceivesHRA: () => {},
  hraAmount: 0,
  setHraAmount: () => {},
  rentPaid: 0,
  setRentPaid: () => {},
  isMetroCity: false,
  setIsMetroCity: () => {},
  hasHomeLoan: false,
  setHasHomeLoan: () => {},
  
  hraExemption: 0,
  setHraExemption: () => {},
  lta: 0,
  setLta: () => {},
  professionalTax: 2400,
  setProfessionalTax: () => {},
  otherExemptions: 0,
  setOtherExemptions: () => {},
  totalExemptions: 2400,
  
  standardDeduction: true,
  setStandardDeduction: () => {},
  
  hasOtherDeductions: true,
  setHasOtherDeductions: () => {},
  
  epfContribution: 0,
  setEpfContribution: () => {},
  ppfInvestment: 0,
  setPpfInvestment: () => {},
  elssInvestment: 0,
  setElssInvestment: () => {},
  lifeInsurance: 0,
  setLifeInsurance: () => {},
  tuitionFees: 0,
  setTuitionFees: () => {},
  otherEightyC: 0,
  setOtherEightyC: () => {},
  section80C: 0,
  
  section80D: 25000,
  setSection80D: () => {},
  section80G: 0,
  setSection80G: () => {},
  section80TTA: 0,
  setSection80TTA: () => {},
  nps: 50000,
  setNps: () => {},
  housingLoanInterest: 0,
  setHousingLoanInterest: () => {},
  educationLoanInterest: 0,
  setEducationLoanInterest: () => {},
  
  employmentType: 'private',
  setEmploymentType: () => {},
  employerNpsContribution: 0,
  setEmployerNpsContribution: () => {},
  
  tdsPaid: 0,
  setTdsPaid: () => {},
  tcsPaid: 0,
  setTcsPaid: () => {},
  
  oldRegimeTaxableIncome: 0,
  newRegimeTaxableIncome: 0,
  oldRegimeTax: 0,
  newRegimeTax: 0,
  oldRegimeSurcharge: 0,
  newRegimeSurcharge: 0,
  oldRegimeCess: 0,
  newRegimeCess: 0,
  oldRegimeRebate: 0,
  newRegimeRebate: 0,
  oldRegimeMarginalRelief: 0,
  newRegimeMarginalRelief: 0,
  oldRegimeTotal: 0,
  newRegimeTotal: 0,
  oldRegimeFinalLiability: 0,
  newRegimeFinalLiability: 0,
  betterRegime: 'new',
  taxSavings: 0,
  
  oldRegimeBreakdown: [],
  newRegimeBreakdown: [],
  taxComparisonData: [],
  
  exportAsPDF: () => {},
  shareCalculation: () => {},
  getTaxRecommendations: () => [],
};

const TaxDataContext = createContext<TaxDataContextType>(defaultContext);

export const useTaxData = () => useContext(TaxDataContext);

export const TaxDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // General settings
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('simple');
  const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>('2026-27');
  const [selectedRegime, setSelectedRegime] = useState<TaxRegime>('new');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('below60');
  const [residentialStatus, setResidentialStatus] = useState<ResidentialStatus>('resident');
  
  // Income details
  const [salaryIncome, setSalaryIncome] = useState<number>(1000000);
  const [basicSalary, setBasicSalary] = useState<number>(500000);
  const [hasOtherIncome, setHasOtherIncome] = useState<boolean>(false);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [rentalIncome, setRentalIncome] = useState<number>(0);
  const [businessIncome, setBusinessIncome] = useState<number>(0);
  const [capitalGains, setCapitalGains] = useState<number>(0);
  const [agricultureIncome, setAgricultureIncome] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(1000000);
  
  // HRA and other flags
  const [receivesHRA, setReceivesHRA] = useState<boolean>(false);
  const [hraAmount, setHraAmount] = useState<number>(0);
  const [rentPaid, setRentPaid] = useState<number>(0);
  const [isMetroCity, setIsMetroCity] = useState<boolean>(false);
  const [hasHomeLoan, setHasHomeLoan] = useState<boolean>(false);
  
  // Exemptions
  const [hraExemption, setHraExemption] = useState<number>(0);
  const [lta, setLta] = useState<number>(0);
  const [professionalTax, setProfessionalTax] = useState<number>(2400);
  const [otherExemptions, setOtherExemptions] = useState<number>(0);
  const [totalExemptions, setTotalExemptions] = useState<number>(2400);
  
  // Standard deduction
  const [standardDeduction, setStandardDeduction] = useState<boolean>(true);
  
  // Deductions
  const [hasOtherDeductions, setHasOtherDeductions] = useState<boolean>(true);
  
  // 80C components
  const [epfContribution, setEpfContribution] = useState<number>(0);
  const [ppfInvestment, setPpfInvestment] = useState<number>(0);
  const [elssInvestment, setElssInvestment] = useState<number>(0);
  const [lifeInsurance, setLifeInsurance] = useState<number>(0);
  const [tuitionFees, setTuitionFees] = useState<number>(0);
  const [otherEightyC, setOtherEightyC] = useState<number>(0);
  const [section80C, setSection80C] = useState<number>(0);
  
  // Other deductions
  const [section80D, setSection80D] = useState<number>(25000);
  const [section80G, setSection80G] = useState<number>(0);
  const [section80TTA, setSection80TTA] = useState<number>(0);
  const [nps, setNps] = useState<number>(50000);
  const [housingLoanInterest, setHousingLoanInterest] = useState<number>(0);
  const [educationLoanInterest, setEducationLoanInterest] = useState<number>(0);
  
  // Employment details
  const [employmentType, setEmploymentType] = useState<EmploymentType>('private');
  const [employerNpsContribution, setEmployerNpsContribution] = useState<number>(0);
  
  // TDS/TCS
  const [tdsPaid, setTdsPaid] = useState<number>(0);
  const [tcsPaid, setTcsPaid] = useState<number>(0);
  
  // Tax calculation results
  const [oldRegimeTaxableIncome, setOldRegimeTaxableIncome] = useState<number>(0);
  const [newRegimeTaxableIncome, setNewRegimeTaxableIncome] = useState<number>(0);
  const [oldRegimeTax, setOldRegimeTax] = useState<number>(0);
  const [newRegimeTax, setNewRegimeTax] = useState<number>(0);
  const [oldRegimeSurcharge, setOldRegimeSurcharge] = useState<number>(0);
  const [newRegimeSurcharge, setNewRegimeSurcharge] = useState<number>(0);
  const [oldRegimeCess, setOldRegimeCess] = useState<number>(0);
  const [newRegimeCess, setNewRegimeCess] = useState<number>(0);
  const [oldRegimeRebate, setOldRegimeRebate] = useState<number>(0);
  const [newRegimeRebate, setNewRegimeRebate] = useState<number>(0);
  const [oldRegimeMarginalRelief, setOldRegimeMarginalRelief] = useState<number>(0);
  const [newRegimeMarginalRelief, setNewRegimeMarginalRelief] = useState<number>(0);
  const [oldRegimeTotal, setOldRegimeTotal] = useState<number>(0);
  const [newRegimeTotal, setNewRegimeTotal] = useState<number>(0);
  const [oldRegimeFinalLiability, setOldRegimeFinalLiability] = useState<number>(0);
  const [newRegimeFinalLiability, setNewRegimeFinalLiability] = useState<number>(0);
  
  // Update 80C total when individual components change
  useEffect(() => {
    const totalEightyC = epfContribution + ppfInvestment + elssInvestment + lifeInsurance + tuitionFees + otherEightyC;
    setSection80C(Math.min(totalEightyC, 150000));
  }, [epfContribution, ppfInvestment, elssInvestment, lifeInsurance, tuitionFees, otherEightyC]);
  
  // Calculate HRA exemption when required inputs change
  useEffect(() => {
    if (receivesHRA && rentPaid > 0) {
      const calculatedHraExemption = calculateHRAExemption(basicSalary, hraAmount, rentPaid, isMetroCity);
      setHraExemption(calculatedHraExemption);
    } else {
      setHraExemption(0);
    }
  }, [receivesHRA, basicSalary, hraAmount, rentPaid, isMetroCity]);
  
  // Update total exemptions
  useEffect(() => {
    const exemptionsTotal = hraExemption + lta + professionalTax + otherExemptions;
    setTotalExemptions(exemptionsTotal);
  }, [hraExemption, lta, professionalTax, otherExemptions]);
  
  // Main calculation effect
  useEffect(() => {
    // Calculate total income
    let grossTotalIncome = salaryIncome;
    
    if (hasOtherIncome) {
      grossTotalIncome += otherIncome + businessIncome + capitalGains + rentalIncome;
    }
    
    setTotalIncome(grossTotalIncome);
    
    // Old Regime Taxable Income Calculation
    let taxableIncomeOldRegime = grossTotalIncome - totalExemptions;
    
    if (standardDeduction) {
      taxableIncomeOldRegime -= 50000; // Old regime standard deduction
    }
    
    if (hasOtherDeductions) {
      const eligible80C = Math.min(section80C, 150000);
      const eligible80D = Math.min(section80D, 25000);
      const eligible80TTA = Math.min(section80TTA, 10000);
      const eligible80G = section80G; // Donations
      const eligibleNPS = Math.min(nps, 50000);
      const eligibleHousingLoan = Math.min(housingLoanInterest, 200000);
      const eligibleEducationLoan = educationLoanInterest;
      
      taxableIncomeOldRegime -= (eligible80C + eligible80D + eligible80TTA + eligible80G + eligibleNPS + eligibleHousingLoan + eligibleEducationLoan);
    }
    
    if (employerNpsContribution > 0) {
      const maxNpsLimit = employmentType === 'private' 
        ? basicSalary * 0.14
        : basicSalary * 0.10;
      
      const eligibleEmployerNps = Math.min(employerNpsContribution, maxNpsLimit);
      taxableIncomeOldRegime -= eligibleEmployerNps;
    }
    
    taxableIncomeOldRegime = Math.max(0, taxableIncomeOldRegime);
    setOldRegimeTaxableIncome(taxableIncomeOldRegime);
    
    // New Regime Taxable Income Calculation
    let taxableIncomeNewRegime = grossTotalIncome;
    
    if (standardDeduction) {
      taxableIncomeNewRegime -= 75000; // New regime standard deduction
    }
    
    // In new regime, only employer NPS contribution is allowed as deduction
    if (employerNpsContribution > 0) {
      const maxNpsLimit = employmentType === 'private' 
        ? basicSalary * 0.14
        : basicSalary * 0.10;
      
      const eligibleEmployerNps = Math.min(employerNpsContribution, maxNpsLimit);
      taxableIncomeNewRegime -= eligibleEmployerNps;
    }
    
    taxableIncomeNewRegime = Math.max(0, taxableIncomeNewRegime);
    setNewRegimeTaxableIncome(taxableIncomeNewRegime);
    
    // Tax Calculation - Old Regime
    const oldBasicTax = calculateOldRegimeTax(taxableIncomeOldRegime, ageGroup);
    setOldRegimeTax(oldBasicTax);
    
    // Tax Calculation - New Regime
    const newBasicTax = calculateNewRegimeTax(taxableIncomeNewRegime);
    setNewRegimeTax(newBasicTax);
    
    // Apply tax rebate under Section 87A
    const oldRebate = calculateRebate(oldBasicTax, taxableIncomeOldRegime, false);
    const newRebate = calculateRebate(newBasicTax, taxableIncomeNewRegime, true);
    
    let oldTaxAfterRebate = Math.max(0, oldBasicTax - oldRebate);
    let newTaxAfterRebate = Math.max(0, newBasicTax - newRebate);
    
    setOldRegimeRebate(oldRebate);
    setNewRegimeRebate(newRebate);
    
    // Calculate Surcharge
    const oldSurcharge = calculateSurcharge(oldTaxAfterRebate, taxableIncomeOldRegime);
    const newSurcharge = calculateSurcharge(newTaxAfterRebate, taxableIncomeNewRegime);
    
    setOldRegimeSurcharge(oldSurcharge);
    setNewRegimeSurcharge(newSurcharge);
    
    // Calculate Health and Education Cess (4%)
    const oldCess = (oldTaxAfterRebate + oldSurcharge) * 0.04;
    const newCess = (newTaxAfterRebate + newSurcharge) * 0.04;
    
    setOldRegimeCess(oldCess);
    setNewRegimeCess(newCess);
    
    // Calculate Marginal Relief (if applicable)
    const oldMarginalRelief = calculateMarginalRelief(oldTaxAfterRebate + oldSurcharge + oldCess, taxableIncomeOldRegime, false);
    const newMarginalRelief = calculateMarginalRelief(newTaxAfterRebate + newSurcharge + newCess, taxableIncomeNewRegime, true);
    
    setOldRegimeMarginalRelief(oldMarginalRelief);
    setNewRegimeMarginalRelief(newMarginalRelief);
    
    // Total Tax Liability
    const oldTotal = Math.max(0, oldTaxAfterRebate + oldSurcharge + oldCess - oldMarginalRelief);
    const newTotal = Math.max(0, newTaxAfterRebate + newSurcharge + newCess - newMarginalRelief);
    
    setOldRegimeTotal(oldTotal);
    setNewRegimeTotal(newTotal);
    
    // Final Tax Liability (after adjusting for TDS/TCS)
    const oldFinalLiability = Math.max(0, oldTotal - tdsPaid - tcsPaid);
    const newFinalLiability = Math.max(0, newTotal - tdsPaid - tcsPaid);
    
    setOldRegimeFinalLiability(oldFinalLiability);
    setNewRegimeFinalLiability(newFinalLiability);
    
  }, [
    salaryIncome,
    basicSalary, 
    otherIncome,
    businessIncome,
    capitalGains,
    rentalIncome,
    agricultureIncome,
    hasOtherIncome,
    totalExemptions,
    section80C, 
    section80D,
    section80G,
    section80TTA,
    nps, 
    housingLoanInterest,
    educationLoanInterest,
    hasOtherDeductions,
    standardDeduction,
    employmentType,
    employerNpsContribution,
    ageGroup,
    tdsPaid,
    tcsPaid
  ]);
  
  // Better regime and tax savings calculation
  const betterRegime = newRegimeTotal <= oldRegimeTotal ? 'new' : 'old';
  const taxSavings = Math.abs(oldRegimeTotal - newRegimeTotal);
  
  // Prepare comparison data for charts
  const taxComparisonData = [
    { name: 'Old Regime', value: oldRegimeTotal, color: '#0466C8' },
    { name: 'New Regime', value: newRegimeTotal, color: '#38B000' }
  ];
  
  // Detailed breakdown data
  const oldRegimeBreakdown = [
    { name: 'Gross Total Income', value: totalIncome },
    { name: 'Total Exemptions', value: totalExemptions },
    { name: 'Standard Deduction', value: standardDeduction ? 50000 : 0 },
    { name: 'Chapter VI-A Deductions', value: hasOtherDeductions ? 
      (Math.min(section80C, 150000) + Math.min(section80D, 25000) + Math.min(section80TTA, 10000) + 
        section80G + Math.min(nps, 50000) + Math.min(housingLoanInterest, 200000) + educationLoanInterest) : 0 
    },
    { name: 'Taxable Income', value: oldRegimeTaxableIncome },
    { name: 'Basic Tax', value: oldRegimeTax },
    { name: 'Rebate u/s 87A', value: oldRegimeRebate },
    { name: 'Surcharge', value: oldRegimeSurcharge },
    { name: 'Health & Education Cess (4%)', value: oldRegimeCess },
    { name: 'Marginal Relief', value: oldRegimeMarginalRelief },
    { name: 'Total Tax Liability', value: oldRegimeTotal },
    { name: 'TDS/TCS Paid', value: tdsPaid + tcsPaid },
    { name: 'Final Tax Payable', value: oldRegimeFinalLiability }
  ];
  
  const newRegimeBreakdown = [
    { name: 'Gross Total Income', value: totalIncome },
    { name: 'Standard Deduction', value: standardDeduction ? 75000 : 0 },
    { name: 'Taxable Income', value: newRegimeTaxableIncome },
    { name: 'Basic Tax', value: newRegimeTax },
    { name: 'Rebate u/s 87A', value: newRegimeRebate },
    { name: 'Surcharge', value: newRegimeSurcharge },
    { name: 'Health & Education Cess (4%)', value: newRegimeCess },
    { name: 'Marginal Relief', value: newRegimeMarginalRelief },
    { name: 'Total Tax Liability', value: newRegimeTotal },
    { name: 'TDS/TCS Paid', value: tdsPaid + tcsPaid },
    { name: 'Final Tax Payable', value: newRegimeFinalLiability }
  ];
  
  // Generate tax recommendations
  const getTaxRecommendations = () => {
    const recommendations = [];
    
    recommendations.push(`The ${betterRegime} tax regime is better for you, saving you ${formatCurrency(taxSavings)}`);
    
    if (betterRegime === 'old') {
      if (section80C < 150000) {
        recommendations.push(`Invest ${formatCurrency(150000 - section80C)} more in 80C options like ELSS, PPF, or EPF to maximize your tax benefits`);
      }
      
      if (nps < 50000) {
        recommendations.push(`Consider investing ${formatCurrency(50000 - nps)} more in NPS to get additional tax benefits under 80CCD(1B)`);
      }
      
      if (section80D < 25000) {
        recommendations.push(`Get health insurance coverage to utilize remaining ${formatCurrency(25000 - section80D)} deduction under section 80D`);
      }
      
      if (receivesHRA && rentPaid === 0) {
        recommendations.push("Submit your rent receipts to claim HRA exemption and reduce your tax liability");
      }
      
      if (hasHomeLoan && housingLoanInterest === 0) {
        recommendations.push("Ensure you claim the full interest deduction on your home loan to reduce your taxable income");
      }
    } else {
      recommendations.push("Since you're in the new tax regime with fewer deductions, focus on maximizing your take-home salary rather than tax-saving investments");
      
      if (employerNpsContribution === 0 && salaryIncome > 500000) {
        recommendations.push("Consider requesting your employer to restructure your salary to include NPS contributions, as this is deductible even in the new regime");
      }
    }
    
    if (tdsPaid === 0 && totalIncome > 500000) {
      recommendations.push("Make sure to report all TDS deductions as this directly reduces your final tax payment");
    }
    
    return recommendations;
  };
  
  // Export function for PDF
  const exportAsPDF = () => {
    // In a real implementation, we would generate a PDF here
    alert("This feature would export your tax calculation as a PDF");
  };
  
  // Share calculation via link
  const shareCalculation = () => {
    // In a real implementation, we would generate a shareable link
    const baseUrl = window.location.href.split('?')[0];
    const params = new URLSearchParams();
    params.append('salary', salaryIncome.toString());
    params.append('regime', selectedRegime);
    params.append('ay', assessmentYear);
    params.append('age', ageGroup);
    
    const shareableUrl = `${baseUrl}?${params.toString()}`;
    
    navigator.clipboard.writeText(shareableUrl)
      .then(() => {
        alert("Shareable link copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy link. Please try again.");
      });
  };

  return (
    <TaxDataContext.Provider value={{
      calculatorMode,
      setCalculatorMode,
      assessmentYear,
      setAssessmentYear,
      selectedRegime,
      setSelectedRegime,
      ageGroup,
      setAgeGroup,
      residentialStatus,
      setResidentialStatus,
      
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
      agricultureIncome,
      setAgricultureIncome,
      totalIncome,
      
      receivesHRA,
      setReceivesHRA,
      hraAmount,
      setHraAmount,
      rentPaid,
      setRentPaid,
      isMetroCity,
      setIsMetroCity,
      hasHomeLoan,
      setHasHomeLoan,
      
      hraExemption,
      setHraExemption,
      lta,
      setLta,
      professionalTax,
      setProfessionalTax,
      otherExemptions,
      setOtherExemptions,
      totalExemptions,
      
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
      
      oldRegimeTaxableIncome,
      newRegimeTaxableIncome,
      oldRegimeTax,
      newRegimeTax,
      oldRegimeSurcharge,
      newRegimeSurcharge,
      oldRegimeCess,
      newRegimeCess,
      oldRegimeRebate,
      newRegimeRebate,
      oldRegimeMarginalRelief,
      newRegimeMarginalRelief,
      oldRegimeTotal,
      newRegimeTotal,
      oldRegimeFinalLiability,
      newRegimeFinalLiability,
      betterRegime,
      taxSavings,
      
      oldRegimeBreakdown,
      newRegimeBreakdown,
      taxComparisonData,
      
      exportAsPDF,
      shareCalculation,
      getTaxRecommendations
    }}>
      {children}
    </TaxDataContext.Provider>
  );
};
