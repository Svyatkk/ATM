'use client'
import styles from './BlockHotel.module.css'
import { IHost } from '@/types/host.interface'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { userService } from '@/api/user.service'
type Props = {
    host: IHost
}

export default function BlockHotel({ host }: Props) {
    const route = useRouter()

    const [fav, setFav] = useState(false)

    const handleAdddFav = async () => {

        try {
            await userService.addFav(host.id)
            setFav(true);
            alert('Додано в улюблені!');
        } catch (error) {
            console.log(error)
        }


    }

    return (



        <div className={styles.block} onClick={() => {
            route.push(`/houses/${host.id}`)

        }}>
            <div className={styles.image}>
            </div>
            <div className={styles.description}>
                <div onClick={() => {

                }} className={styles.text}>
                    <p>  {host.name}</p>
                    <p> {host.address}</p>
                </div>

                <div onClick={(e) => {
                    e.stopPropagation()
                    handleAdddFav()
                    alert('its ok')

                }} className={`${styles.fav}${fav ? styles.active : ""}`}></div>
            </div>
        </div>
    )
}