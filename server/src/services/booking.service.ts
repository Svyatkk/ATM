import { prisma } from '../index'

export const bookTheRoom = async (userid: number, data: any) => {
    const { checkIn, checkOut, totalPrice, childrenCount, status, roomTypeId } = data

    const availableRoom = await prisma.room.findFirst({
        where: { roomTypeId: roomTypeId }
    });

    if (!availableRoom) {
        throw new Error("Немає створених кімнат цього типу");
    }
    const booking = await prisma.booking.create({
        data: {
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            totalPrice: Number(totalPrice),
            childrenCount: childrenCount || 0,
            status: status || 'PENDING',
            roomId: availableRoom.id,
            userId: userid
        }
    })

    return booking
}

export const getOrder = async (userid: number) => {
    const order = await prisma.booking.findFirst({
        where: {
            userId: userid
        },
        include: {
            room: true
        }

    })

    return order


} 
