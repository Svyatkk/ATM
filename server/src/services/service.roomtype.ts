
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


