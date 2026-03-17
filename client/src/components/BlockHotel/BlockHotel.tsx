'use client'
import styles from './BlockHotel.module.css'
import { IHost } from '@/types/host.interface'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
    host: IHost
}

export default function BlockHotel({ host }: Props) {
    const route = useRouter()


    const [fav, setFav] = useState(false)


    return (

        <div className={styles.block} onClick={() => {
            route.push(`/houses/${host.id}`)
        }}>
            <div className={styles.image}>
            </div>
            <div className={styles.description}>
                <div className={styles.text}>
                    <p>  {host.name}</p>
                    <p> {host.address}</p>
                </div>

                <div onClick={(e) => {
                    e.stopPropagation()


                }} className={`${styles.fav}${fav ? styles.active : ""}`}></div>



            </div>



        </div>
    )
}