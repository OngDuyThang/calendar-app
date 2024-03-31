/*
  Warnings:

  - You are about to drop the column `dateId` on the `Calendar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "dateId",
ADD COLUMN     "dateIds" TEXT[];
