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




export default function Home() {
    const [blocksHotel, setBlockHotel] = useState<IHost[] | null>()

    const pathName = usePathname()


    useEffect(() => {

        houseService.getAllHouses()
            .then(data => setBlockHotel(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.page}>



                {blocksHotel?.map((item, index) => {
                    return <BlockHotel host={item} key={index}></BlockHotel>
                })}
            </div>
        </>
    )
}