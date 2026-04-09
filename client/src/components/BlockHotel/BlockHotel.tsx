'use client'
import styles from './BlockHotel.module.css'
import { IHost } from '@/types/host.interface'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { userService } from '@/api/user.service'
import { houseService } from '@/api/house.service'

type Props = {
    host: IHost,
    inSearch?: boolean,

}

export default function BlockHotel({ host, inSearch, }: Props) {
    const route = useRouter()
    const [isFav, setIsFav] = useState(false)
    const maxLenght = 120


    useEffect(() => {
        userService.showFav()
            .then((favorites: IHost[]) => {
                const isFavorited = favorites.some(favHouse => favHouse.id === host.id);
                setIsFav(isFavorited);
            })
            .catch(err => console.log(err))
    }, [host.id])

    const handleFavClick = async (e: React.MouseEvent) => {
        e.stopPropagation()

        const newFavState = !isFav;
        setIsFav(newFavState);

        try {
            if (newFavState) {
                await userService.addFav(host.id);
            } else {
                await userService.deleteFav(host.id);
            }
        } catch (error) {
            console.log("Помилка при оновленні:", error);
            setIsFav(!newFavState);
        }
    };


    return (
        <div className={`${styles.block} ${inSearch ? styles.inSearch : ''}`} onClick={() => route.push(`/houses/${host.id}`)}>
            <div className={styles.image}></div>

            <div className={styles.description}>
                <div className={styles.text}>
                    <p className={styles.name}>{host.name}</p>
                    <p className={styles.address}>{host.address}</p>
                    <p>{inSearch ? host.description ? host.description : <p className={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p> : ''}</p>
                </div>


                <div
                    onClick={handleFavClick}
                    className={`${styles.fav} ${isFav ? styles.active : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        className={styles.heartIcon}
                        fill={isFav ? "red" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
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