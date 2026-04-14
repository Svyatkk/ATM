'use client'

import styles from './style.module.css'

import Link from 'next/link'

export default function PanelButtons() {
    return (
        <>
            <div className={styles.buttons}>
                <Link className={styles.button} href={'/'}>Мій акаунт</Link>

                <Link href={'/favourites'} className={styles.button}>
                    Обране
                </Link >

                <Link href={'/orders'} className={styles.button}
                >Заброньоване</Link>
            </div>
        </>
    )
}