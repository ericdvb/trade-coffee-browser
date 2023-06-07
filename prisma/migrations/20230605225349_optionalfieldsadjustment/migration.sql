/*
  Warnings:

  - You are about to drop the column `tasteGroupDisplay` on the `Coffee` table. All the data in the column will be lost.
  - You are about to drop the column `tasteGroupObject` on the `Coffee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "tasteGroupDisplay",
DROP COLUMN "tasteGroupObject",
ADD COLUMN     "tasteGroup" TEXT;
