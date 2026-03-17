import { ICity } from "./city.interface"
export type ICountry = {
    id: number,
    name: string,
    cities: ICity
}

