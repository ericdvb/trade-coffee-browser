/*
  Warnings:

  - A unique constraint covering the columns `[coffeeName,roasterId]` on the table `Coffee` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roasterId` on table `Coffee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Coffee" DROP CONSTRAINT "Coffee_roasterId_fkey";

-- AlterTable
ALTER TABLE "Coffee" ALTER COLUMN "roasterId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coffee_coffeeName_roasterId_key" ON "Coffee"("coffeeName", "roasterId");

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_roasterId_fkey" FOREIGN KEY ("roasterId") REFERENCES "Roaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
