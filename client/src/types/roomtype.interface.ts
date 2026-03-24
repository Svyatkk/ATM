import { HostType, IHost } from "./host.interface"
import { Iroom } from "./room.interface"
import { IImage } from "./image.interface"




export type IRoomType = {
    id: number,
    name: string, // стандарт люкс сімейний
    pricePerNight: number,
    capacity: number,

    houseId: number,
    house?: IHost,

    images: IImage[],


    rooms: Iroom[]



}


//model RoomType {
//   id            Int    @id @default(autoincrement())
//   name          String
//   pricePerNight Float
//   capacity      Int

//   HouseId Int
//   House   House  @relation(fields: [HouseId], references: [id])
//   rooms   Room[]
// }

// model Room {
//   id         Int    @id @default(autoincrement())
//   roomNumber String

//   roomTypeId Int
//   roomType   RoomType  @relation(fields: [roomTypeId], references: [id])
//   bookings   Booking[]
// }
