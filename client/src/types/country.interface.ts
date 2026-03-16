import { ICity } from "./city.interface"
export type ICountry = {
    id: number,
    name: string,
    cities: ICity
}


// model Country {
//   id     Int    @id @default(autoincrement())
//   name   String @unique
//   cities City[]
// }