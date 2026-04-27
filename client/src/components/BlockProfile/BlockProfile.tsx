'use client'

import { userService } from "@/api/user.service"
import { useState, useEffect } from "react"
import { IHost } from "@/types/host.interface"
import { IUser } from "@/types/user.interface"


import styles from './BlockProfile.module.css'


export default function BlockProfile() {
    const [user, setUser] = useState<IUser | null>(null)
    const [hosts, setHosts] = useState<IHost[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

            <section className={styles.block}>

                {
                    user ? (
                        <div className={styles.profile}>

                            <p>{user?.name}</p>
                            <p>{user?.email}</p>
                        </div>
                    )


                        : (
                            <div>
                                <p>Ви не авторизовані</p>
                                <button>Авторизуватися</button>
                            </div>
                        )
                }

            </section>

        </>
    )
}