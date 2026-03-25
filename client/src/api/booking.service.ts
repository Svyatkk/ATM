
import { IFormRoom } from "@/types/IFormRoom.interface";
import { BASE_URL, fetchOptions } from "./config";
import { IBooking } from "@/types/booking.interface";
export const bookingService = {

    async createBooking(payload: IBooking): Promise<IBooking> {
        const response = fetch(`${BASE_URL}/createBooking`, {
            method: "POST",
            ...fetchOptions,
            body: JSON.stringify(payload)
        })


        return (await response).json()

    },

    async getBooking() {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: "GET",
            ...fetchOptions,
        })


        return response.json()

    }



}