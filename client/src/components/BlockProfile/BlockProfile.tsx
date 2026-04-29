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
        <section className={styles.block}>
            {user ? (
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <h2 className={styles.name}>{user.name}</h2>
                    <p className={styles.email}>{user.email}</p>

                    <div className={styles.infoSection}>

                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>ID користувача</span>
                            <span className={styles.infoValue}>#{user.id}</span>
                        </div>

                    </div>
                </div>
            ) : (
                <div className={styles.notAuth}>
                    <div className={styles.avatar} style={{ background: '#e2e8f0', color: '#94a3b8', boxShadow: 'none' }}>
                        ?
                    </div>
                    <p>Ви не авторизовані</p>
                    <button className={styles.loginBtn}>Авторизуватися</button>
                </div>
            )}
        </section>
    )
}
