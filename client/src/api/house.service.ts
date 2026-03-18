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



}


