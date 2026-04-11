'use client'
import styles from './page.module.css'
import { useState } from 'react'
import { IUser } from '@/types/user.interface'
import { useRouter } from 'next/navigation'
import { userService } from '@/api/user.service'

export default function Register() {

    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const handleRegister = async () => {

        const payload = {
            email,
            name,
            password
        }

        try {
            await userService.userRegister(payload)
            router.push('/')
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>

            <div className={styles.container}>
                <h1>Зареєсртуватися</h1>
                <div className={styles.containerInputs}>
                    <label>
                        <input onChange={(e) => {
                            setName(e.target.value)
                        }}
                            placeholder='Name' type="text" />
                    </label>
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
                        <input onClick={handleRegister} type="submit" />
                    </label>

                </div>

                <div className={styles.backLogin}>
                    <p>Вже зареєстровані ?</p>
                    <button onClick={() => router.push('/login')} className={styles.registerButton}>Увійти</button>
                </div>
            </div>
        </>
    )
}