import { prisma } from '../index'


//model RoomType {
//   id            Int     @id @default(autoincrement())
//   name          String
//   pricePerNight Float
//   capacity      Int
//   images        Image[]

//   HouseId Int
//   House   House  @relation(fields: [HouseId], references: [id])
//   rooms   Room[]
// }

export const createRoomType = async (data: any) => {

    const { name, pricePerNight, capacity, HouseId } = data


    const roomType = await prisma.roomType.create({
        data: {
            name, pricePerNight, capacity, HouseId,
        }
    })
    return roomType
}



export const createRoom = async (data: any) => {
    const { roomNumber, roomTypeId } = data

    const room = await prisma.room.create({
        data: {
            roomNumber,
            roomTypeId

        }
    })
    return room
}


// model Room {
//   id         Int    @id @default(autoincrement())
//   roomNumber String

//   roomTypeId Int
//   roomType   RoomType  @relation(fields: [roomTypeId], references: [id])
//   bookings   Booking[]
// }




export const createHouse = async (data: any) => {

    const { name, address, animals, type, cityId, userId, roomTypes } = data


    const house = await prisma.house.create({
        data: {
            name,
            address,
            animals,
            type,

            cityId,

            userId,

            roomTypes: {
                create: roomTypes
            }
        }
    })

    return house;
}