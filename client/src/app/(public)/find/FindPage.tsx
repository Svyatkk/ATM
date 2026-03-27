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
        const resp = houseService.getSearchedHouses(city, capacity)
            .then(data => setHost(data))
            .catch(err => console.log(err))

    }, [city, capacity])


    return (
        <>

            <div className={styles.mainContainer}>

                <div className={styles.sideBlock}>

                </div>

                <div className={styles.hotels}>

                    {hosts?.map((host) => (
                        <BlockHotel inSearch={true} host={host} key={host.id} />


                    ))}


                </div>


            </div>

        </>
    )
}