
import { IHost } from "@/types/host.interface";
import { BASE_URL, fetchOptions } from "./config";
import { ICity } from "@/types/city.interface";


export const cityService = {
    async getAllCitites(): Promise<ICity[]> {
        const response = await fetch(`${BASE_URL}/city`, {
            method: "GET",
            ...fetchOptions
        })

        if (!response.ok) {
            throw new Error("Помилка під час завантаження міст");
        }



        const data: ICity[] = await response.json();
        return data;

    }

}