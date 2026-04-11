import { connect } from 'node:http2'
import { prisma } from '../index'
import { HouseType } from '@prisma/client'


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
            city: true,
            roomTypes: {
                include: {
                    rooms: true
                }
            }
        }
    })
    return house
}


export const getApartmentsByType = async (type: HouseType) => {
    const apartmaents = await prisma.house.findMany({
        where: {
            type: type

        }
    })

    return apartmaents


}

export const getHouses = async () => {

    const house = await prisma.house.findMany()
    return house
}


export const getSearchedHouses = async (cityName: string, capacity: number, checkIn: string, checkOut: string) => {

    const validCapacity = isNaN(capacity) || capacity < 1 ? 1 : capacity;

    const hasDates = Boolean(checkIn && checkOut);
    const checkInDate = hasDates ? new Date(checkIn as string) : undefined;
    const checkOutDate = hasDates ? new Date(checkOut as string) : undefined;


    const houses = await prisma.house.findMany({
        where: {
            city: {
                name: {
                    equals: cityName,
                    mode: 'insensitive'
                }
            },
            roomTypes: {
                some: {
                    capacity: {
                        gte: validCapacity
                    },
                    rooms: {
                        some: {
                            bookings: hasDates ? {
                                none: {
                                    status: { not: 'CANCELLED' },
                                    checkIn: { lt: checkOutDate },
                                    checkOut: { gt: checkInDate }
                                }
                            } : undefined
                        }
                    }
                }
            },

        },

        include: {
            city: true,
            roomTypes: true,
            images: true
        }
    });

    return houses;
};