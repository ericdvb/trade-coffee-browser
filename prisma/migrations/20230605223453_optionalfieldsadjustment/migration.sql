/*
  Warnings:

  - You are about to drop the column `tasteGroup` on the `Coffee` table. All the data in the column will be lost.
  - Added the required column `tasteGroupDisplay` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasteGroupObject` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "tasteGroup",
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "tasteGroupDisplay" TEXT NOT NULL,
ADD COLUMN     "tasteGroupObject" TEXT NOT NULL,
ALTER COLUMN "fetchedAtTime" SET DATA TYPE TEXT,
ALTER COLUMN "roasterDescription" DROP NOT NULL,
ALTER COLUMN "process" DROP NOT NULL,
ALTER COLUMN "elevationHi" DROP NOT NULL,
ALTER COLUMN "elevationLow" DROP NOT NULL,
ALTER COLUMN "starRating" DROP NOT NULL,
ALTER COLUMN "bodyLevel" DROP NOT NULL,
ALTER COLUMN "acidityLevel" DROP NOT NULL,
ALTER COLUMN "roastLevel" DROP NOT NULL;
