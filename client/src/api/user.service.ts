import { BASE_URL, fetchOptions } from "./config";
import { IUser } from "@/types/user.interface";


export const userService = {
    async userRegister(payload: any): Promise<IUser> {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            ...fetchOptions,
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error('Помилка реєстрації');


        }
        return response.json()
    },

    async getProfile() {
        const response = await fetch(`${BASE_URL}/users/profile`, {
            method: "GET",
            ...fetchOptions
        })
        if (!response.ok) {
            throw new Error('Користувач не авторизований');
        }
        return response.json()
    },



    async userlogin(payload: any): Promise<IUser> {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            ...fetchOptions,
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error('Помилка входу');
        }
        return response.json()
    },

    async getUser() {
        const response = await fetch(`${BASE_URL}/users/profile`, {
            method: "GET",
            ...fetchOptions
        })
        if (!response.ok) {
            throw new Error('Користувач не авторизований');
        }
        return response.json()
    },


    async showFav() {
        const response = await fetch(`${BASE_URL}/users/favourites`, {
            method: "GET",
            ...fetchOptions,
        })

        if (!response.ok) {
            throw new Error('Помилка при показі обраних готелів');
        }
        return response.json()
    },


    async addFav(id: number) {
        const response = await fetch(`${BASE_URL}/users/profile/${id}`, {
            method: "POST",
            ...fetchOptions,
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка додавання в улюблені');
        }
        return response.json()
    },

    async deleteFav(id: number) {
        const response = await fetch(`${BASE_URL}/users/profile/delete-fav/${id}`, {
            method: "POST",
            ...fetchOptions,
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка додавання в улюблені');
        }
        return response.json()
    }



}
