'use client'
import styles from './page.module.css'
import { useState } from 'react'
import { IUser } from '@/types/user.interface'
import { useRouter } from 'next/navigation'
import { userService } from '@/api/user.service'
export default function Login() {

    const route = useRouter()

    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const handleLogin = async () => {
        const payload = {
            password,
            email
        }
        try {
            await userService.userlogin(payload)
            route.push('/')
            route.refresh();
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