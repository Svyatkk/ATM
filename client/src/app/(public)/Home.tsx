'use client'

import styles from './page.module.css'
import SearchingPanel from '@/components/SearchingPanel/SearchingPanel'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.interface'
import { IHost } from '@/types/host.interface'
import BlockHotel from '@/components/BlockHotel/BlockHotel'
import { houseService } from '@/api/house.service'
import { data } from 'react-router-dom'

export default function Home() {
    const [blocksHotel, setBlockHotel] = useState<IHost[] | null>()

    useEffect(() => {
        houseService.getAllHouses()
            .then(data => setBlockHotel(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.page}>

                <SearchingPanel></SearchingPanel>
                {blocksHotel?.map((item, index) => {
                    return <BlockHotel host={item} key={index}></BlockHotel>
                })}
            </div>
        </>
    )
}