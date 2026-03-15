/*
  Warnings:

  - You are about to drop the column `hotelId` on the `RoomType` table. All the data in the column will be lost.
  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFavoriteHotels` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `HouseId` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HouseType" AS ENUM ('Apartment', 'Home', 'House');

-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_cityId_fkey";

-- DropForeignKey
ALTER TABLE "RoomType" DROP CONSTRAINT "RoomType_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteHotels" DROP CONSTRAINT "_UserFavoriteHotels_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteHotels" DROP CONSTRAINT "_UserFavoriteHotels_B_fkey";

-- AlterTable
ALTER TABLE "RoomType" DROP COLUMN "hotelId",
ADD COLUMN     "HouseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Hotel";

-- DropTable
DROP TABLE "_UserFavoriteHotels";

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "animals" BOOLEAN,
    "type" "HouseType" NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFavoriteHouses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFavoriteHouses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFavoriteHouses_B_index" ON "_UserFavoriteHouses"("B");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomType" ADD CONSTRAINT "RoomType_HouseId_fkey" FOREIGN KEY ("HouseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteHouses" ADD CONSTRAINT "_UserFavoriteHouses_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteHouses" ADD CONSTRAINT "_UserFavoriteHouses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
