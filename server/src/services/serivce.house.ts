import { connect } from 'node:http2'
import { prisma } from '../index'


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

export const getHouseByid = async (id: number) => {
    const house = await prisma.house.findUnique({
        where: {
            id: id
        },
        include: {
            roomTypes: {
                include: {
                    rooms: true
                }
            }
        }
    })

    return house
}


export const getHouses = async () => {

    const house = await prisma.house.findMany()


    return house
}


