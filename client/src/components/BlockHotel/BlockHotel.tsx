'use client'
import styles from './BlockHotel.module.css'
import { IHost } from '@/types/host.interface'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { userService } from '@/api/user.service'
import { useEffect } from 'react'
type Props = {
    host: IHost
}

export default function BlockHotel({ host }: Props) {
    const route = useRouter()
    const [fav, setFav] = useState(false)

    const [favs, setFavs] = useState<boolean | false>()


    useEffect(() => {

        userService.showFav().then(res => setFavs(res)).catch(err => console.log(err))
    }, [])




    const handleFav = async () => {
        try {
            if (fav) {
                await userService.deleteFav(host.id);
            } else {
                await userService.addFav(host.id);
            }
        } catch (error) {
            console.log(error);
            setFav(prev => !prev);
        }
    };




    return (
        <div className={styles.block} onClick={() => {
            route.push(`/houses/${host.id}`)
        }}>
            <div className={styles.image}>
            </div>

            <div className={styles.description}>
                <div className={styles.text}>
                    <p>{host.name}</p>
                    <p>{host.address}</p>
                </div>

                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        setFav(prev => !prev)
                        handleFav()
                    }}
                    className={`${styles.fav} ${favs ? styles.active : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        className={styles.heartIcon}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </div>




            </div>
        </div>
    )
}