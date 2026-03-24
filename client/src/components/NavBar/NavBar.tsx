'use client'
import styles from './NavBar.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.interface'
import { userService } from '@/api/user.service'
import { useRouter } from 'next/navigation'
import SearchingPanel from '../SearchingPanel/SearchingPanel'
import { useParams } from 'next/navigation'

export default function NavBar() {

    const [user, setUser] = useState<IUser | null>()
    const router = useRouter()

    const params = useParams()
    const houseId = params?.id as number | undefined;

    useEffect(() => {
        userService.getUser()
            .then(data => {
                setUser(data.user || data);
            })
            .catch(err => {
                console.log('Помилка авторизації:', err);
                setUser(null);
            });
    }, [])




    return (
        <>
            <nav className={styles.nav}>
                <h1>ATM</h1>

                <div className={styles.useBlock}>
                    <button onClick={() => {
                        router.push('/register-host')
                    }}>Зареєструвати власне помешкання</button>
                    <Image className={styles.heart} onClick={() => {
                        router.push('/favourites')
                    }} height={32} width={32} alt='heart' src={'/img/heart.png'}></Image>
                    <span className={styles.userAvatar}></span>

                    <div className={styles.text}>

                        <p>{user?.name}</p>
                        <p>text</p>
                    </div>
                </div>

                <div className={styles.search}>
                    <SearchingPanel number={houseId}></SearchingPanel>
                </div>
            </nav >
        </>
    )
}

