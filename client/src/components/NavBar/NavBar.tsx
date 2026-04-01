'use client'
import styles from './NavBar.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.interface'
import { userService } from '@/api/user.service'
import { useRouter } from 'next/navigation'
import SearchingPanel from '../SearchingPanel/SearchingPanel'
import { useParams } from 'next/navigation'
import DropDownMenuProfile from '../DropDownMenuProfile/DropDownMenuProfile'

export default function NavBar() {


    const [user, setUser] = useState<IUser | null>()
    const [show, setShow] = useState<boolean>(false)
    const [blockMenu, setBlockMenu] = useState<boolean>(false)

    const router = useRouter()
    const params = useParams()
    const houseId = params?.id as number | undefined;


    useEffect(() => {
        userService.getUser()
            .then(data => {
                setUser(data.user || data);
                setBlockMenu(true)
            })
            .catch(err => {
                console.log('Помилка авторизації:', err);
                setUser(null);
            });
    }, [])


    return (
        <>
            <nav className={styles.nav}>
                <h1 onClick={() => {
                    router.push('/')
                }} className={styles.h1}>ATM</h1>


                <div className={styles.useBlock}>
                    <button onClick={() => {
                        router.push('/register-host')
                    }}>Зареєструвати власне помешкання</button>

                    <span className={styles.userAvatar}></span>


                    <div onClick={() => {
                        blockMenu && setShow(prev => !prev)
                    }} className={styles.text}>

                        <DropDownMenuProfile show={show}></DropDownMenuProfile>
                        <p>{user ?
                            user?.name
                            :

                            <div className={styles.buttons}>
                                <button onClick={() => router.push('/login')}>Увійти</button>
                                <button onClick={() => router.push('/register')}>Зареєструватися</button>

                            </div>




                        }</p>
                    </div>



                </div>


                <div className={styles.search}>
                    <SearchingPanel number={houseId}></SearchingPanel>
                </div>
            </nav >
        </>
    )
}

