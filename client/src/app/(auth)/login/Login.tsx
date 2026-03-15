'use client'
import styles from './page.module.css'
import { useState } from 'react'
import { IUser } from '@/types/user.interface'


export default function Login() {

    const [user, setUser] = useState<IUser | null>()

    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password })
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data)

            }
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>

            <div className={styles.container}>
                <h1>Увійти</h1>
                <div className={styles.containerInputs}>
                    <label>
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }} placeholder='Email' type="text" />
                    </label>
                    <label>
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} placeholder='Password' type="text" />
                    </label>
                    <label>
                        <input onClick={handleLogin} type="submit" />
                    </label>

                </div>
            </div>
        </>
    )
}