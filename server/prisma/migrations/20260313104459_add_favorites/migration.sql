/*
  Warnings:

  - Added the required column `childrenCount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "childrenCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "animals" BOOLEAN;

-- CreateTable
CREATE TABLE "_UserFavoriteCities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFavoriteCities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserFavoriteHotels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFavoriteHotels_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFavoriteCities_B_index" ON "_UserFavoriteCities"("B");

-- CreateIndex
CREATE INDEX "_UserFavoriteHotels_B_index" ON "_UserFavoriteHotels"("B");

-- AddForeignKey
ALTER TABLE "_UserFavoriteCities" ADD CONSTRAINT "_UserFavoriteCities_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteCities" ADD CONSTRAINT "_UserFavoriteCities_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteHotels" ADD CONSTRAINT "_UserFavoriteHotels_A_fkey" FOREIGN KEY ("A") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteHotels" ADD CONSTRAINT "_UserFavoriteHotels_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
