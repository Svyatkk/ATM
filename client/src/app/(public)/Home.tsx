'use client'

import styles from './page.module.css'
import SearchingPanel from '@/components/SearchingPanel/SearchingPanel'
import React, { useEffect, useState } from 'react'
import { IUser } from '@/types/user.interface'
import { IHost } from '@/types/host.interface'
import BlockHotel from '@/components/BlockHotel/BlockHotel'
import { houseService } from '@/api/house.service'
import { data } from 'react-router-dom'
import { usePathname } from 'next/navigation'
import { ICity } from '@/types/city.interface'
import { cityService } from '@/api/city.service'



export default function Home() {
    const [blocksHotel, setBlockHotel] = useState<IHost[] | null>()
    const [cities, setCities] = useState<ICity[]>([])


    const pathName = usePathname()

    useEffect(() => {
        cityService.getAllCitites()
            .then(res => setCities(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {

        houseService.getAllHouses()
            .then(data => setBlockHotel(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.page}>

                {cities.map((item) => {
                    return <div className={styles.country} key={item.id}>{item.name}</div>
                })}

                {blocksHotel?.map((item, index) => {
                    return <BlockHotel host={item} key={index}></BlockHotel>
                })}
            </div>
        </>
    )
}