function calculateSavings(
    transactions: {
      date: Date;
      type: Transaction;
      category: Category;
      amount: number;
    }[]
  ) {
    const savingsMap: Record<string, number> = {};

    for (const t of transactions) {
      const month = t.date.toISOString().slice(0, 7); // YYYY-MM format
      if (!savingsMap[month]) {
        savingsMap[month] = 0;
      }

      if (t.type === Transaction.income) {
        savingsMap[month] += t.amount;
      } else if (t.type === Transaction.expense) {
        savingsMap[month] -= t.amount;
      }
    }
    return savingsMap;
  }