'use client'


import styles from './style.module.css'
import { useRouter } from 'next/navigation'
import { PAGES_URL } from '@/api/config'
export default function RegisterHostButton() {

    const router = useRouter()


    return (
        <>
            <button className={styles.button} onClick={() => {
                router.push(PAGES_URL.REGISTER_HOST)
            }}>Зареєструвати власне помешкання</button>

        </>
    )
}