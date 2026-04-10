'use client'
import { IHost } from "@/types/host.interface"
import { useEffect } from "react"
import { useState } from "react"
import { houseService } from "@/api/house.service"
import { userService } from "@/api/user.service"
import BlockHotel from "@/components/BlockHotel/BlockHotel"
import styles from './styles.module.css'
export default function Favourites() {

    const [hotels, setHotels] = useState<IHost[] | null>()

    useEffect(() => {
        userService.showFav()
            .then(data => {
                console.log("Мої улюблені:", data);
                setHotels(data);
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <>

            <div className={styles.block}>
                <h1 style={{ color: "black" }}>Моя наступна подорож</h1>
                <div className={styles.hosts}>
                    {
                        hotels?.map((item, index) => {
                            return <BlockHotel host={item} key={index}></BlockHotel>
                        })
                    }
                </div>

            </div>


        </>
    )
}