'use client'

import styles from './page.module.css'
import { IHost } from '@/types/host.interface'
import { houseService } from '@/api/house.service'
import { useEffect, useState } from 'react'
import BlockHotel from '@/components/BlockHotel/BlockHotel'

type Props = {
    city: string,
    capacity: number
}



export default function FindPage({ city, capacity }: Props) {



    const [hosts, setHost] = useState<IHost[]>([])


    useEffect(() => {
        houseService.getSearchedHouses(city, capacity)
            .then(data => {
                if (Array.isArray(data)) {
                    setHost(data);
                } else {
                    console.log("Бекенд повернув не масив:", data);
                    setHost([]);
                }
            })
            .catch(err => {
                console.log("Помилка запиту:", err);
                setHost([]);
            })
    }, [city, capacity])


    return (
        <>


            {hosts?.map((host) => (
                <BlockHotel host={host} key={host.id} />
            ))}



        </>
    )
}