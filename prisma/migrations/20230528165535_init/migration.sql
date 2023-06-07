-- CreateTable
CREATE TABLE "Coffee" (
    "id" TEXT NOT NULL,
    "fetchedAtTime" TIMESTAMP(3) NOT NULL,
    "roasterId" TEXT NOT NULL,
    "detailPageURI" TEXT NOT NULL,
    "coffeeName" TEXT NOT NULL,
    "coffeeImageURI" TEXT NOT NULL,
    "coffeeWeight" TEXT NOT NULL,
    "availableWeights" TEXT NOT NULL,
    "flavors" TEXT[],
    "tradeDescription" TEXT NOT NULL,
    "roasterDescription" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "subRegion" TEXT NOT NULL,
    "elevationHi" INTEGER NOT NULL,
    "elevationLow" INTEGER NOT NULL,
    "starRating" INTEGER NOT NULL,
    "bodyLevel" INTEGER NOT NULL,
    "acidityLevel" INTEGER NOT NULL,
    "roastLevel" INTEGER NOT NULL,
    "queueable" BOOLEAN NOT NULL,
    "varietal" TEXT[],
    "tasteGroup" TEXT NOT NULL,
    "selectEligible" BOOLEAN NOT NULL,
    "premiumEligible" BOOLEAN NOT NULL,
    "classicsEligible" BOOLEAN NOT NULL,
    "price" JSONB NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roaster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURI" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "roasterURI" TEXT NOT NULL,

    CONSTRAINT "Roaster_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_roasterId_fkey" FOREIGN KEY ("roasterId") REFERENCES "Roaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
