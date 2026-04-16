'use client'

import { IHost } from '@/types/host.interface';
import styles from './SearchingPanel.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { houseService } from '@/api/house.service';
import { data } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ICity } from '@/types/city.interface';
import DateDropDown from '../DateDropDown/DateDropDown';
type Props = {
    number?: number | null
}

export default function SearchingPanel({ number }: Props) {
    const [checkIn, setCheckIn] = useState<string>()
    const [checkOut, setCheckOut] = useState<string>()

    const [click, setClick] = useState<boolean>(false)
    const [currenthost, setcurrrentHost] = useState<IHost | null>()

    const [city, setCity] = useState<ICity | string>()
    const [capacity, setCapacity] = useState<number>(1)

    const [exceptCity, setExceptCity] = useState<string>()
    const path = usePathname()


    const route = useRouter()
    const handleSearch = () => {
        if (!city) {
            setExceptCity(currenthost?.city?.name);
        }
        const searchCity = city || exceptCity;

        let searchPath = `/find?city=${searchCity}&capacity=${capacity}`;


        if (checkIn && checkOut) {
            searchPath += `&checkIn=${checkIn}&checkOut=${checkOut}`;
        }

        route.push(searchPath);
    }
    useEffect(() => {
        if (number) {
            houseService.gethouseByid(Number(number))
                .then(data => setcurrrentHost(data))
                .catch(err => console.log(err))
        }
    }, [number])


    return (
        <>
            <div className={styles.searchingPanels}>

                <label className={styles.panelCity} >
                    <span>
                        <Image height={30} width={30} src={'/img/bedLogo.png'} alt='Bed'>
                        </Image>
                    </span>

                    {path === '/' || path.includes('?') ? '' : currenthost?.name}

                    < input onChange={(e) => {


                        setCity(e.target.value)
                    }} type="text" />
                </label>

                <label className={styles.panelCountPeople} >
                    <span>
                        <Image height={30} width={30} src={'/img/calendarLogo.png'} alt='Bed'>
                        </Image>
                    </span>

                    <div onClick={() => {
                        setClick(prev => !prev)
                    }} className={styles.date}>
                        <div className={styles.dateText}>
                            {
                                checkIn || checkOut ?
                                    (
                                        <div>{checkIn} - {checkOut}</div>
                                    )
                                    :
                                    (
                                        <div>Оберіть дати </div>
                                    )
                            }

                        </div>
                        <DateDropDown checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} show={click}></DateDropDown>
                    </div>

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


