import { IRoomType } from "./roomtype.interface"

export type Iroom = {
    id: number,
    roomNumber: string, // 102 103 
    roomTypeId: number,



    roomType?: IRoomType

}


// model Room {
//   id         Int    @id @default(autoincrement())
//   roomNumber String

//   roomTypeId Int
//   roomType   RoomType  @relation(fields: [roomTypeId], references: [id])
//   bookings   Booking[]
// }
