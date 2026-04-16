'use client'

import { PAGES_URL } from '@/api/config'
import styles from './style.module.css'

import Link from 'next/link'

export default function PanelButtons() {
    return (
        <>
            <div className={styles.buttons}>
                <Link className={styles.button} href={'/'}>Мій акаунт</Link>

                <Link href={PAGES_URL.FAVOURITES} className={styles.button}>
                    Обране
                </Link >

                <Link href={PAGES_URL.ORDERS} className={styles.button}
                >Заброньоване</Link>
            </div>
        </>
    )
}