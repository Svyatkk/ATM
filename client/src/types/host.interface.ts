import { IUser } from "./user.interface"
import { IRoomType } from "./roomtype.interface";
import { ICity } from "./city.interface";
export type HostType = { name: "Apartment", hrefimg: '/img/apartlogo.jpg' }
    | { name: "Home", hrefimg: '/img/homelogo.png' } |
{ name: "Hotel", hrefimg: '/img/hotellogo.png' };



export type IHost = {
    id: number,
    name: string,
    address: string,
    animals: boolean,
    type: HostType,
    city: ICity,
    roomTypes: IRoomType[],
    favouriteBy: IUser[]
    description: string





}

export const hostTypeOptions: HostType[] = [{ name: "Apartment", hrefimg: '/img/apartlogo.jpg' }, { name: "Home", hrefimg: '/img/homelogo.png' }, { name: "Hotel", hrefimg: '/img/hotellogo.png' }];




//model House {
//   id        Int        @id @default(autoincrement())
//   name      String
//   address   String
//   animals   Boolean?
//   type      HouseType
//   cityId    Int
//   city      City       @relation(fields: [cityId], references: [id])
//   roomTypes RoomType[]

//   favoritedBy User[] @relation("UserFavoriteHouses")
// }