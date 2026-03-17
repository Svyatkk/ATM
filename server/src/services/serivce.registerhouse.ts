import { connect } from 'node:http2'
import { prisma } from '../index'




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




export const createHouse = async (data: any, userId: number) => {

    const { name, address, animals, type, city, roomTypes } = data

    const house = await prisma.house.create({
        data: {
            name,
            address,
            animals,
            type,

            owner: {
                connect: { id: userId }
            },

            city: {
                connectOrCreate: {
                    where: { name: city },
                    create: {
                        name: city,
                        country: {
                            connectOrCreate: {
                                where: { name: data.country },
                                create: { name: data.country }
                            }
                        }
                    }
                }
            },

            roomTypes: {
                create: roomTypes
            }
        }
    })

    return house;
}