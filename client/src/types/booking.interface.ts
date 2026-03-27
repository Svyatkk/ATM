type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'
import { IUser } from "./user.interface"
import { Iroom } from "./room.interface"
import { IRoomType } from "./roomtype.interface"
export type IBooking = {
    id: number,
    checkIn: string,
    checkOut: string,
    totalPrice: string,
    childrenCount: number,
    status: BookingStatus,
    createdAt: string,
    user: IUser,

    room: Iroom




}


//model Booking {
//   id         Int      @id @default(autoincrement())
//   checkIn    DateTime
//   checkOut   DateTime
//   totalPrice Float

//   childrenCount Int

//   status    BookingStatus @default(PENDING)
//   createdAt DateTime      @default(now())

//   userId Int
//   user   User @relation(fields: [userId], references: [id])

//   roomId Int
//   room   Room @relation(fields: [roomId], references: [id])
// }
