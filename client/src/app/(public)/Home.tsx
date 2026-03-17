'use client'

import styles from './page.module.css'
import SearchingPanel from '@/components/SearchingPanel/SearchingPanel'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.interface'
import { IHost } from '@/types/host.interface'
import BlockHotel from '@/components/BlockHotel/BlockHotel'


export default function Home() {
    const [blocksHotel, setBlockHotel] = useState<IHost[] | null>()

    useEffect(() => {
        fetch(`http://localhost:3001/api/houses`)
            .then(res => res.json())
            .then(data => setBlockHotel(data))
            .then(err => console.log(err))

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