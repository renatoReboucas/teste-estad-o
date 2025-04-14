/*
  Warnings:

  - You are about to drop the column `userId` on the `News` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_userId_fkey";

-- DropIndex
DROP INDEX "News_userId_idx";

-- AlterTable
ALTER TABLE "News" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
