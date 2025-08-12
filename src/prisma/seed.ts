import { prisma } from "@/lib/db";

async function main() {
  // Upsert the user
  const user = await prisma.user.upsert({
    where: { email: "manishlal2274@gmail.com" },
    update: {},
    create: {
      email: "manishlal2274@gmail.com",
      name: "Manish Kumar",
      phone: "1234567890",
      dob: new Date("1990-01-01"),
      address: "123 Main St, City, Country",
      bio: "A brief bio about John Doe.",
    },
  });

  const userId = user.id;

  // Create transactions if none exist
  const existingTransactions = await prisma.transactions.findMany({
    where: { userId },
  });
  if (existingTransactions.length === 0) {
    await prisma.transactions.createMany({
      data: [
        {
          userId,
          type: "income",
          date: new Date(),
          amount: 100000,
          description: "Salary",
          category: "income",
        },
        {
          userId,
          type: "expense",
          date: new Date(),
          amount: 200,
          description: "Groceries",
          category: "food",
        },
        {
          userId,
          type: "expense",
          date: new Date(),
          amount: 5000,
          description: "Utilities",
          category: "utilities",
        },
      ],
    });
  }

  // Create savings if none exist
  const savings = await prisma.savings.findMany({ where: { userId } });
  if (savings.length === 0) {
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    await prisma.savings.createMany({
      data: [
        { userId, amount: 100000, date: currentMonth },
        { userId, amount: 50000, date: previousMonth },
      ],
    });
  }

  // Create tax returns if none exist
  const taxReturns = await prisma.taxReturns.findMany({ where: { userId } });
  if (taxReturns.length === 0) {
    await prisma.taxReturns.createMany({
      data: [
        { userId, year: 2022, amount: 15000 },
        { userId, year: 2023, amount: 20000 },
      ],
    });
  }

  // Create investments if none exist
  const investments = await prisma.investments.findMany({ where: { userId } });
  if (investments.length === 0) {
    await prisma.investments.createMany({
      data: [
        { userId, name: "Angel One Stock", amount: 20000 },
        { userId, name: "Infotech Shares", amount: 20000 },
      ],
    });
  }

  // Create assets if none exist
  const assets = await prisma.assets.findMany({ where: { userId } });
  if (assets.length === 0) {
    await prisma.assets.createMany({
      data: [
        { userId, name: "Bank Account", amount: 500000 },
        { userId, name: "Stocks", amount: 200000 },
        { userId, name: "Real Estate", amount: 1500000 },
        { userId, name: "Cryptocurrency", amount: 100000 },
      ],
    });
  }

  // Create financial goals if none exist
  const goals = await prisma.financialGoals.findMany({ where: { userId } });
  if (goals.length === 0) {
    await prisma.financialGoals.createMany({
      data: [
        {
          userId,
          title: "Buy a new car",
          description: "Save for a new car in 2 years",
          amount: 200000,
          duration: 24,
        },
        {
          userId,
          title: "Home Renovation",
          description: "Renovate the kitchen and bathroom",
          amount: 500000,
          duration: 12,
        },
        {
          userId,
          title: "Vacation to Europe",
          description: "Save for a trip to Europe next summer",
          amount: 300000,
          duration: 6,
        },
        {
          userId,
          title: "Emergency Fund",
          description: "Build an emergency fund for unexpected expenses",
          amount: 1000000,
          duration: 36,
        },
      ],
    });
  }

  console.log(`User and related data initialized for: ${user.email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
