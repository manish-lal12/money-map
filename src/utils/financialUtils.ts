
// Common financial utility functions

/**
 * Format currency in Indian Rupee format
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
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
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  
  return lastThree;
};

/**
 * Calculate SIP returns
 */
export const calculateSIPReturns = (monthlyInvestment: number, years: number, expectedReturn: number): number => {
  const months = years * 12;
  const r = expectedReturn / 100 / 12;
  
  const amount = monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  
  return Math.round(amount);
};

/**
 * Categorize transaction based on keywords
 */
export const categorizeTransaction = (description: string): string => {
  description = description.toLowerCase();
  
  if (description.includes('rent') || description.includes('house') || description.includes('apartment')) {
    return 'Housing';
  } else if (description.includes('food') || description.includes('grocery') || description.includes('restaurant')) {
    return 'Food';
  } else if (description.includes('electricity') || description.includes('water') || description.includes('bill')) {
    return 'Utilities';
  } else if (description.includes('movie') || description.includes('entertainment') || description.includes('game')) {
    return 'Entertainment';
  } else if (description.includes('invest') || description.includes('mutual fund') || description.includes('stock')) {
    return 'Investments';
  } else if (description.includes('travel') || description.includes('trip') || description.includes('flight')) {
    return 'Travel';
  } else {
    return 'Miscellaneous';
  }
};

/**
 * Common expense categories with colors
 */
export const expenseCategories = [
  { name: 'Housing', color: '#0466C8' },
  { name: 'Food', color: '#38B000' },
  { name: 'Utilities', color: '#FF9500' },
  { name: 'Transportation', color: '#9D4EDD' },
  { name: 'Entertainment', color: '#F72585' },
  { name: 'Healthcare', color: '#4CC9F0' },
  { name: 'Education', color: '#FFBA08' },
  { name: 'Investments', color: '#277DA1' },
  { name: 'Shopping', color: '#A98467' },
  { name: 'Miscellaneous', color: '#6C757D' }
];

/**
 * Sample transactions for demo purposes
 */
export const sampleTransactions = [
  {
    id: 1,
    date: new Date().toISOString(),
    description: 'Salary Credit',
    amount: 100000,
    type: 'income',
    category: 'Income'
  },
  {
    id: 2,
    date: new Date().toISOString(),
    description: 'Rent Payment',
    amount: 25000,
    type: 'expense',
    category: 'Housing'
  },
  {
    id: 3,
    date: new Date().toISOString(),
    description: 'Grocery Shopping',
    amount: 4500,
    type: 'expense',
    category: 'Food'
  },
  {
    id: 4,
    date: new Date().toISOString(),
    description: 'Electricity Bill',
    amount: 2800,
    type: 'expense',
    category: 'Utilities'
  },
  {
    id: 5,
    date: new Date().toISOString(),
    description: 'Mutual Fund SIP',
    amount: 10000,
    type: 'expense',
    category: 'Investments'
  }
];
