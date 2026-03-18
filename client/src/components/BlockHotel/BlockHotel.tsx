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


    const handleAdddFav = async () => {

        try {
            const response = await fetch(`http://localhost:3001/api/users/profile/${host.id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setFav(true)
            }
            else {
                const errorData = await response.json();
                console.error("Помилка додавання:", errorData);
                alert(errorData.message || 'Помилка');
            }

        } catch (error) {
            console.log(error)


        }

    }
    //userouter.post('/profile/:houseid', authMiddleware, addFavHouseCon)

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