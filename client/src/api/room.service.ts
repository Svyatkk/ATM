
import { IFormRoom } from "@/types/IFormRoom.interface";
import { BASE_URL, fetchOptions } from "./config";
import { IUser } from "@/types/user.interface";

export const roomService = {
    async registerRoom(payload: any): Promise<IFormRoom> {
        const response = await fetch(`${BASE_URL}/room/register`, {
            method: "POST",
            ...fetchOptions,
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error('Помилка реєстрації');

        }
        return response.json()
    }
}

