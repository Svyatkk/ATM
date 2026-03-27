import { connect } from 'node:http2'
import { prisma } from '../index'



export const getAllCities = async () => {
    const cities = await prisma.city.findMany()


    return cities


}


