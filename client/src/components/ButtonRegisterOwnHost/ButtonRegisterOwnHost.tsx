'use client'


import styles from './style.module.css'
import { useRouter } from 'next/navigation'

export default function RegisterHostButton() {

    const router = useRouter()





    return (
        <>
            <button className={styles.button} onClick={() => {
                router.push('/register-host')
            }}>Зареєструвати власне помешкання</button>

        </>
    )
}