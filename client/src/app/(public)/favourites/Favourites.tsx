'use client'
import { IHost } from "@/types/host.interface"
import { useEffect } from "react"
import { useState } from "react"
import { houseService } from "@/api/house.service"
import { userService } from "@/api/user.service"
import BlockHotel from "@/components/BlockHotel/BlockHotel"

export default function Favourites() {

    const [hotels, setHotels] = useState<IHost[] | null>()

    useEffect(() => {
        userService.showFav()
            .then(res => res.json())
            .then(data => {
                console.log("Мої улюблені:", data);
                setHotels(data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {hotels?.map((item, index) => {
                return <BlockHotel host={item} key={index}></BlockHotel>
            })}
        </>
    )
}