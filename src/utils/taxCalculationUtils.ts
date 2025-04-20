import { formatCurrency } from "./financialUtils";

type AgeGroup = "below60" | "60to80" | "above80";

/**
 * Calculate tax under old regime
 */
export const calculateOldRegimeTax = (
  taxableIncome: number,
  ageGroup: AgeGroup
): number => {
  let tax = 0;

  // Set exemption limit based on age
  let exemptionLimit = 250000; // Below 60
  if (ageGroup === "60to80") {
    exemptionLimit = 300000;
  } else if (ageGroup === "above80") {
    exemptionLimit = 500000;
  }

  // If income is below exemption limit, no tax
  if (taxableIncome <= exemptionLimit) {
    return 0;
  }

  // Calculate tax based on slabs
  if (ageGroup === "below60" || ageGroup === "60to80") {
    if (taxableIncome > 1000000) {
      tax = (taxableIncome - 1000000) * 0.3 + 112500;
    } else if (taxableIncome > 500000) {
      tax = (taxableIncome - 500000) * 0.2 + 12500;
    } else if (taxableIncome > exemptionLimit) {
      tax = (taxableIncome - exemptionLimit) * 0.05;
    }
  } else if (ageGroup === "above80") {
    if (taxableIncome > 1000000) {
      tax = (taxableIncome - 1000000) * 0.3 + 100000;
    } else if (taxableIncome > 500000) {
      tax = (taxableIncome - 500000) * 0.2;
    }
  }

  return Math.round(tax);
};

/**
 * Calculate tax under new regime
 */
export const calculateNewRegimeTax = (taxableIncome: number): number => {
  let tax = 0;

  // New regime slabs (AY 2026-27)
  if (taxableIncome > 2400000) {
    tax = (taxableIncome - 2400000) * 0.3 + 400000;
  } else if (taxableIncome > 2000000) {
    tax = (taxableIncome - 2000000) * 0.25 + 280000;
  } else if (taxableIncome > 1600000) {
    tax = (taxableIncome - 1600000) * 0.2 + 180000;
  } else if (taxableIncome > 1200000) {
    tax = (taxableIncome - 1200000) * 0.15 + 100000;
  } else if (taxableIncome > 800000) {
    tax = (taxableIncome - 800000) * 0.1 + 40000;
  } else if (taxableIncome > 400000) {
    tax = (taxableIncome - 400000) * 0.05;
  }

  return Math.round(tax);
};

/**
 * Calculate surcharge based on income level
 */
export const calculateSurcharge = (tax: number, income: number): number => {
  let surcharge = 0;

  if (income > 50000000) {
    // Income > 5 crore: 37% surcharge
    surcharge = tax * 0.37;
  } else if (income > 20000000) {
    // Income > 2 crore: 25% surcharge
    surcharge = tax * 0.25;
  } else if (income > 10000000) {
    // Income > 1 crore: 15% surcharge
    surcharge = tax * 0.15;
  } else if (income > 5000000) {
    // Income > 50 lakh: 10% surcharge
    surcharge = tax * 0.1;
  }

  return Math.round(surcharge);
};

/**
 * Calculate rebate under section 87A
 */
export const calculateRebate = (
  tax: number,
  income: number,
  isNewRegime: boolean
): number => {
  // No rebate if tax is 0
  if (tax === 0) return 0;

  // Different income limits for old and new regime
  const incomeLimit = isNewRegime ? 1200000 : 500000;
  const maxRebate = isNewRegime ? 60000 : 12500;

  if (income <= incomeLimit) {
    return Math.min(tax, maxRebate);
  }

  return 0;
};

/**
 * Calculate HRA exemption
 */
export const calculateHRAExemption = (
  basicSalary: number,
  hraReceived: number,
  rentPaid: number,
  isMetroCity: boolean
): number => {
  // No exemption if rent paid is less than 10% of basic salary
  if (rentPaid <= basicSalary * 0.1) {
    return 0;
  }

  // Calculate exemption based on three conditions, minimum is the exemption
  const exemption1 = hraReceived;
  const exemption2 = rentPaid - 0.1 * basicSalary;
  const exemption3 = isMetroCity ? 0.5 * basicSalary : 0.4 * basicSalary;

  return Math.min(exemption1, exemption2, exemption3);
};

/**
 * Calculate marginal relief for income just above rebate limit
 */
export const calculateMarginalRelief = (
  tax: number,
  income: number,
  isNewRegime: boolean
): number => {
  const rebateLimit = isNewRegime ? 1200000 : 500000;
  const additionalIncome = income - rebateLimit;

  // Only apply marginal relief for incomes just above rebate limit (within 50,000)
  if (additionalIncome > 0 && additionalIncome < 50000) {
    // Calculate marginal relief
    const limitExcess = additionalIncome;
    if (tax > limitExcess) {
      return tax - limitExcess;
    }
  }

  return 0;
};

/**
 * Format Indian currency
 * (moved from financialUtils to fix import error)
 */
export const formatIndianCurrency = (value: number): string => {
  // Convert to string
  const numStr = value.toString();

  // Handle numbers less than 1000
  if (value < 1000) {
    return numStr;
  }

  // Extract last 3 digits
  const lastThree = numStr.substring(numStr.length - 3);

  // Extract other digits
  const otherNumbers = numStr.substring(0, numStr.length - 3);

  // Format with commas
  if (otherNumbers !== "") {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }

  return lastThree;
};
