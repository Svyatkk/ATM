import { HostType, IHost } from "./host.interface"
import { Iroom } from "./room.interface"
import { IRoomType } from "./roomtype.interface"
export type IImage = {
    id: number,
    url: string | '',


    roomTypeId?: number,
    rooms?: IRoomType



    hostid?: number,
    hohsts?: HostType


}

//model Image {
//   id         Int       @id @default(autoincrement())
//   url        String
//   roomType   RoomType? @relation(fields: [roomTypeId], references: [id])
//   roomTypeId Int?
//   house      House?    @relation(fields: [houseId], references: [id])
//   houseId    Int?
// }