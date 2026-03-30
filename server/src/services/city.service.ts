import { connect } from 'node:http2'
import { prisma } from '../index'



export const getAllCities = async () => {
    const cities = await prisma.city.findMany()


    return cities


}
export const getCityByName = async (name: string) => {
    const city = await prisma.city.findUnique({
        where: { name: name },
        include: {
            Houses: true
        }

    })

    return city

}

