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
import { userService } from '@/api/user.service'


export default function Home() {
    const [blocksHotel, setBlockHotel] = useState<IHost[] | null>()
    const [cities, setCities] = useState<ICity[]>([])
    const [apartments, setApartments] = useState<IHost[]>([])
    const [hotels, setHotels] = useState<IHost[]>([])
    const [popularCities, setPopularCities] = useState<ICity[]>([])



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
        cityService.getmostPopularCities()
            .then(res => setPopularCities(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        houseService.getAllHouses()
            .then(data => setHotels(data))
            .catch(err => console.log(err))
    }, [])


    const getApartments = (type: string) => {
        houseService.getApartmentsByType(type)
            .then(res => setApartments(res))
            .catch(err => console.log(err))
    }
    const getHotels = (type: string) => {
        houseService.getApartmentsByType(type)
            .then(res => setApartments(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={styles.page}>


                <div className={styles.cities}>
                    {cities.map((item) => {
                        return <div onClick={() => route.push(`/find?city=${item.name}&capacity=${1}`)} className={styles.city} key={item.id}>{item.name}</div>
                    })}
                </div>


                <div className={styles.popularCities}>
                    <h2>Популярні міста</h2>
                    {popularCities?.map((item) => {
                        return <div onClick={() => route.push(`/find?city=${item.name}&capacity=${1}`)} className={styles.city} key={item.id}>{item.name}</div>
                    })}
                </div>
                <div className={styles.Hotels}>

                    <div className={styles.hosts}>
                        <h2>Апартаменти</h2>
                        {apartments?.map((item, index) => {
                            return <BlockHotel host={item} key={index} ></BlockHotel>
                        })}

                    </div>


                    <div className={styles.hosts}>
                        <h2>Готелі</h2>
                        {hotels?.map((item, index) => {
                            return <BlockHotel host={item} key={index} ></BlockHotel>
                        })}

                    </div>
                </div>

            </div>
        </>
    )
}