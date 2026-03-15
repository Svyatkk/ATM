import { prisma } from '../index';

export const getUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            phone: true,
        }
    });

    if (!user) {
        throw new Error('Користувача не знайдено');
    }

    return user;
};