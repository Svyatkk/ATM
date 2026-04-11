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
import RegisterHostButton from '../ButtonRegisterOwnHost/ButtonRegisterOwnHost'
import Register from '@/app/(auth)/register/Register'
import SideBar from '../SideBar/SideBar'
import { BlobOptions } from 'buffer'



export default function NavBar() {


    const [showSidebar, setShowSidebar] = useState<boolean>()


    const [hamClikc, setHamClicked] = useState<boolean>()


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


                    <RegisterHostButton></RegisterHostButton>

                    <span className={styles.userAvatar}></span>


                    <div onClick={() => {
                        blockMenu && setShow(prev => !prev)
                    }} className={styles.text}>

                        <DropDownMenuProfile show={show}></DropDownMenuProfile>
                        {user ?
                            user?.name
                            :

                            <div className={styles.buttons}>
                                <button onClick={() => router.push('/login')}>Увійти</button>
                                <button onClick={() => router.push('/register')}>Зареєструватися</button>

                            </div>

                        }




                    </div>

                    <div

                        onClick={() => {
                            setHamClicked(prev => !prev)
                            setShowSidebar(prev => !prev)


                        }}
                        className={`${styles.hamMenu} ${hamClikc ? styles.active : ''}`}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>


                </div>


                <div className={styles.search}>
                    <SearchingPanel number={houseId}></SearchingPanel>
                </div>



                <SideBar show={showSidebar}></SideBar>
            </nav >
        </>
    )
}

