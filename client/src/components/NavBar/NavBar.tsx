'use client'
import styles from './NavBar.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.interface'

import { useRouter } from 'next/navigation'
export default function NavBar() {

    const [user, setUser] = useState<IUser | null>()
    const router = useRouter()



    useEffect(() => {
        fetch(`http://localhost:3001/api/users/profile`, {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error('Помилка авторизації');
                return res.json();
            })
            .then(data => {
                setUser(data.user);
            })
            .catch(err => console.log(err));


    }, [])

    return (
        <>


            <nav className={styles.nav}>
                <h1>ATM</h1>

                <div className={styles.useBlock}>
                    <button>Зареєструвати власне помешкання</button>
                    <Image className={styles.heart} onClick={() => {
                        router.push('/favourites')
                    }} height={32} width={32} alt='heart' src={'/img/heart.png'}></Image>
                    <span className={styles.userAvatar}></span>

                    <div className={styles.text}>

                        <p>{user?.name}</p>
                        <p>text</p>
                    </div>
                </div>
            </nav >
        </>
    )
}

