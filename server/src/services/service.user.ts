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


export const addFavHouse = async (houseId: number, userid: number) => {


    const user = await prisma.user.update({
        where: {
            id: userid
        },
        data: {
            favoriteHouses: {
                connect: { id: houseId }

            }
        }
    })

    return user
}
export const removeFavHouse = async (houseId: number, userid: number) => {


    const user = await prisma.user.update({
        where: {
            id: userid
        },
        data: {
            favoriteHouses: {
                disconnect: { id: houseId }

            }
        }
    })

    return user
}


