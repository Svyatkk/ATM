import { ICountry } from "./country.interface"
import { IHost } from "./host.interface"
import { IUser } from "./user.interface"

export type ICity = {
    id: number,
    name: string,

    countryId: number,
    country: ICountry,

    houses: IHost[]
    favoritedBy: IUser[]
}