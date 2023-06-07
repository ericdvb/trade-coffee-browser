/*
  Warnings:

  - You are about to drop the column `availableWeights` on the `Coffee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Roaster` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Coffee" DROP CONSTRAINT "Coffee_roasterId_fkey";

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "availableWeights",
ALTER COLUMN "fetchedAtTime" DROP NOT NULL,
ALTER COLUMN "roasterId" DROP NOT NULL,
ALTER COLUMN "subRegion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Roaster" ALTER COLUMN "imageURI" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roaster_name_key" ON "Roaster"("name");

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_roasterId_fkey" FOREIGN KEY ("roasterId") REFERENCES "Roaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
