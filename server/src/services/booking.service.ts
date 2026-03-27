import { prisma } from '../index'

export const bookTheRoom = async (userid: number, data: any) => {
    const { checkIn, checkOut, totalPrice, childrenCount, status, roomTypeId } = data


    const checkInDate = new Date(checkIn)

    const checkOutDate = new Date(checkOut)

    const availableRoom = await prisma.room.findFirst({
        where: {
            roomTypeId: roomTypeId,

            bookings: {
                none: {
                    status: { not: 'CANCELLED' },
                    checkIn: { lt: checkOutDate },
                    checkOut: { lt: checkInDate }
                }
            }
        },

    });

    if (!availableRoom) {
        throw new Error("Немає створених кімнат цього типу");
    }



    const booking = await prisma.booking.create({
        data: {
            checkIn: checkInDate,
            checkOut: checkOutDate,
            totalPrice: Number(totalPrice),
            childrenCount: childrenCount || 0,
            status: status || 'PENDING',
            roomId: availableRoom.id,
            userId: userid
        }
    });
    return booking
}

export const getOrder = async (userid: number) => {
    const orders = await prisma.booking.findMany({
        where: {
            userId: userid
        },
        include: {
            room: {
                include: {
                    roomType: {
                        include: {
                            House: true
                        }
                    }
                }
            }
        }
    })


    return orders


} 
