'use client'

import styles from './page.module.css'
import SearchingPanel from '@/components/SearchingPanel/SearchingPanel'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.interface'

export default function Home() {
    const [user, setUser] = useState<IUser | null>()

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
            <div className={styles.page}>

                <SearchingPanel></SearchingPanel>



                Вітаємо {user?.name}

            </div>
        </>
    )
}