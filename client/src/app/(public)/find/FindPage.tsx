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
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [allowsPets, setAllowsPets] = useState<boolean>(false)



    const filteredHosts = hosts.filter((host) => {


        //   const typeMath = selectedTypes.length === 0 || selectedTypes.includes(host.type.name)

        const petsMatch = !allowsPets || host.animals === true;

        return petsMatch
    })




    useEffect(() => {
        houseService.getSearchedHouses(city, capacity)
            .then(data => setHost(data))
            .catch(err => console.log(err))

    }, [city, capacity])


    return (
        <>

            <div className={styles.mainContainer}>

                <div className={styles.sideBlock}>
                    <label htmlFor="">Можна собакам ?<input onChange={(e) => {
                        setAllowsPets(prev => !prev)

                    }} type="checkbox" /></label>

                </div>

                <div className={styles.hotels}>

                    {filteredHosts.length > 0 ? (
                        filteredHosts.map((host) => (
                            <BlockHotel inSearch={true} host={host} key={host.id} />
                        ))
                    ) : (
                        <p className={styles.noResults}>За вашими фільтрами нічого не знайдено.</p>
                    )}
                </div>

            </div>

        </>
    )
}