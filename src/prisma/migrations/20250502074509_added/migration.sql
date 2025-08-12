/*
  Warnings:

  - Added the required column `name` to the `Savings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Savings" ADD COLUMN     "name" TEXT NOT NULL;
