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

//model City {
//   id   Int    @id @default(autoincrement())
//   name String @unique

//   countryId Int
//   country   Country @relation(fields: [countryId], references: [id])

//   Houses House[]

//   favoritedBy User[] @relation("UserFavoriteCities")
// }

