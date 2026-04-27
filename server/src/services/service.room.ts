import bcrypt from 'bcrypt';
import { sign } from 'hono/jwt';
import { prisma } from '../index';
import { checkPrime } from 'node:crypto';

export const createRoom = async (data: any, userId: number,) => {

    const { roomNumber, roomType } = data


    const room = await prisma.room.create({
        data: {
            roomNumber,
            roomType

        }
    })
}
