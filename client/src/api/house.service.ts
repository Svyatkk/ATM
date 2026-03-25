import { IHost } from "@/types/host.interface";
import { BASE_URL, fetchOptions } from "./config";


export const houseService = {
    async getAllHouses(): Promise<IHost[]> {
        const response = await fetch(`${BASE_URL}/houses`)
        if (!response.ok) throw new Error('Не вдалося завантажити житло');
        return response.json()
    },

    async registerHost(payload: any) {
        const response = await fetch(`${BASE_URL}/registerhost/registerHost`, {
            method: 'POST',
            ...fetchOptions,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка реєстрації');
        }
        return response.json();
    },

    async getSearchedHouses(cityName: string, capacity: number) {
        const response = await fetch(`${BASE_URL}/houses/find?city=${cityName}&capacity=${capacity}`, {
            method: "GET",
            ...fetchOptions
        })

        return response.json()
    },



    async gethouseByid(id: number) {

        const response = await fetch(`${BASE_URL}/houses/${id}`, {
            method: "GET",
            ...fetchOptions
        })


        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка отримання');
        }
        return response.json();
    }





}


