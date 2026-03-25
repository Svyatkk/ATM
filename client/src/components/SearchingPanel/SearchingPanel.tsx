'use client'

import { IHost } from '@/types/host.interface';
import styles from './SearchingPanel.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { houseService } from '@/api/house.service';
import { data } from 'react-router-dom';
import { useRouter } from 'next/navigation';
type Props = {
    number?: number | null
}

export default function SearchingPanel({ number }: Props) {

    const [currenthost, setcurrrentHost] = useState<IHost | null>()

    const [city, setCity] = useState<string>('')
    const [capacity, setCapacity] = useState<number>(1)


    const route = useRouter()

    const handleSearch = () => {
        if (!city) {
            alert("Будь ласка, введіть місто");
            return;
        }


        route.push(`/find?city=${city}&capacity=${capacity}`);
    }

    useEffect(() => {
        houseService.gethouseByid(Number(number))
            .then(data => setcurrrentHost(data))
            .catch(err => console.log(err))
    }, [number])

    return (
        <>
            <div className={styles.searchingPanels}>

                <label className={styles.panelCity} >
                    <span>
                        <Image height={30} width={30} src={'/img/bedLogo.png'} alt='Bed'>
                        </Image>
                    </span>
                    {currenthost?.name}


                    <input onChange={(e) => {
                        setCity(e.target.value)
                    }} type="text" />
                </label>


                <label className={styles.panelData} >
                    <span>
                        <Image height={30} width={30} src={'/img/calendarLogo.png'} alt='Bed'>
                        </Image>
                    </span>
                    <input type="date" />
                </label>


                <label className={styles.panelCountPeople} >
                    <span>
                        <Image height={30} width={30} src={'/img/profileLogo.png'} alt='Bed'>
                        </Image>
                    </span>

                    <input onChange={(e) => {
                        setCapacity(Number(e.target.value))
                    }} type="number" />
                </label>
                <button onClick={handleSearch} className={styles.find}>Шукати</button>
            </div>
        </>
    )
}


