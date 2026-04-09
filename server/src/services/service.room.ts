import bcrypt from 'bcrypt';
import { sign } from 'hono/jwt';
import { prisma } from '../index';
import { checkPrime } from 'node:crypto';


//model Room {
//   id         Int    @id @default(autoincrement())
//   roomNumber String

//   roomTypeId Int
//   roomType   RoomType  @relation(fields: [roomTypeId], references: [id])
//   bookings   Booking[]
// }



export const createRoom = async (data: any, userId: number,) => {

    const { roomNumber, roomType } = data

    const room = await prisma.room.create({
        data: {
            roomNumber,
            roomType

        }
    })
}