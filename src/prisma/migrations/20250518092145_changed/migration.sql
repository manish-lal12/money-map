/*
  Warnings:

  - Changed the type of `type` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('income', 'expense');

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- DropEnum
DROP TYPE "Transaction";
