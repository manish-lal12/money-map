// Common financial utility functions

/**
 * Format currency in Indian Rupee format
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format money value
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

/**
 * Calculate SIP returns
 */
export const calculateSIPReturns = (
  monthlyInvestment: number,
  years: number,
  expectedReturn: number
): number => {
  const months = years * 12;
  const r = expectedReturn / 100 / 12;

  const amount =
    monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

  return Math.round(amount);
};

/**
 * Categorize transaction based on keywords
 */
export const categorizeTransaction = (description: string): string => {
  description = description.toLowerCase();

  if (
    description.includes("rent") ||
    description.includes("house") ||
    description.includes("apartment")
  ) {
    return "housing";
  } else if (
    description.includes("food") ||
    description.includes("grocery") ||
    description.includes("restaurant")
  ) {
    return "food";
  } else if (
    description.includes("electricity") ||
    description.includes("water") ||
    description.includes("bill")
  ) {
    return "utilities";
  } else if (
    description.includes("movie") ||
    description.includes("entertainment") ||
    description.includes("game")
  ) {
    return "entertainment";
  } else if (
    description.includes("invest") ||
    description.includes("mutual fund") ||
    description.includes("stock")
  ) {
    return "investment";
  } else if (
    description.includes("travel") ||
    description.includes("trip") ||
    description.includes("flight")
  ) {
    return "travel";
  } else if (
    description.includes("health") ||
    description.includes("doctor") ||
    description.includes("hospital")
  ) {
    return "healthcare";
  } else if (
    description.includes("insurance") ||
    description.includes("insurance premium") ||
    description.includes("insurance EMI")
  ) {
    return "insurance";
  } else if (
    description.includes("education") ||
    description.includes("school") ||
    description.includes("college")
  ) {
    return "education";
  } else if (
    description.includes("salary") ||
    description.includes("income") ||
    description.includes("bonus")
  ) {
    return "income";
  } else {
    return "miscellaneous";
  }
};

/**
 * Common expense categories with colors
 */
export const expenseCategories = [
  { name: "Housing", color: "#0466C8" },
  { name: "Food", color: "#38B000" },
  { name: "Utilities", color: "#FF9500" },
  { name: "Transportation", color: "#9D4EDD" },
  { name: "Entertainment", color: "#F72585" },
  { name: "Healthcare", color: "#4CC9F0" },
  { name: "Education", color: "#FFBA08" },
  { name: "Investments", color: "#277DA1" },
  { name: "Insurance", color: "#00A6A6" },
  { name: "Shopping", color: "#A98467" },
  { name: "Income", color: "#2EC4B6" },
  { name: "Miscellaneous", color: "#6C757D" },
];

const categoryColors: Record<string, string> = {
  income: "#4CAF50",
  housing: "#0466C8",
  food: "#38B000",
  utilities: "#FF9500",
  investment: "#277DA1",
  entertainment: "#F72585",
  travel: "#FF6347",
  healthcare: "#8BC34A",
  insurance: "#FFC107",
  education: "#03A9F4",
  miscellaneous: "#BDBDBD",
};
