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
import { useRouter } from 'next/navigation'


export default function Home() {
    const [blocksHotel, setBlockHotel] = useState<IHost[] | null>()
    const [cities, setCities] = useState<ICity[]>([])
    const [apartments, setApartments] = useState<IHost[]>([])

    const route = useRouter()

    const pathName = usePathname()

    useEffect(() => {
        cityService.getAllCitites()
            .then(res => setCities(res))
            .then(() => {
                getApartments('Apartment')
            })
            .catch(err => console.log(err))
    }, [])



    useEffect(() => {
        houseService.getAllHouses()
            .then(data => setBlockHotel(data))
            .catch(err => console.log(err))
    }, [])


    const getApartments = (type: string) => {
        houseService.getApartmentsByType(type)
            .then(res => setApartments(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={styles.page}>


                <div className={styles.countries}>
                    {cities.map((item) => {
                        return <div onClick={() => route.push(`city/${item.name}`)} className={styles.country} key={item.id}>{item.name}</div>
                    })}
                </div>


                <div className={styles.Hotels}>

                    <div className={styles.hosts}>
                        <h2>Апартаменти</h2>
                        {apartments?.map((item, index) => {
                            return <BlockHotel host={item} key={index} ></BlockHotel>
                        })}

                    </div>
                </div>

            </div>
        </>
    )
}