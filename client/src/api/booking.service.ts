
import { IFormRoom } from "@/types/IFormRoom.interface";
import { BASE_URL, fetchOptions } from "./config";
import { IBooking } from "@/types/booking.interface";
export const bookingService = {


    async createBooking(payload: IBooking): Promise<IBooking> {
        const response = await fetch(`${BASE_URL}/createBooking`, {
            method: "POST",
            ...fetchOptions,
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка бронювання');
        }

        return response.json()

    },

    async getBooking() {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: "GET",
            ...fetchOptions,
        })

        return response.json()
    },
    async removeOrder(bookingId: number) {
        const response = await fetch(`${BASE_URL}/remove/${bookingId}`, {
            method: "DELETE",
            ...fetchOptions,
        })

        return response.json()


    }


}