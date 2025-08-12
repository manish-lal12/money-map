-- AlterTable
ALTER TABLE "Investments" ADD COLUMN     "goalId" TEXT;

-- CreateTable
CREATE TABLE "FinancialGoals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "FinancialGoals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FinancialGoals" ADD CONSTRAINT "FinancialGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investments" ADD CONSTRAINT "Investments_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "FinancialGoals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
