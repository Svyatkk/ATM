'use client'
import { useState } from "react"
import styles from './styles.module.css'
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Props = {
    show: boolean | null
}

export default function DropDownMenuProfile({ show }: Props) {



    const route = useRouter()
    return (
        <>
            {


                <div className={`${styles.block} ${show ? styles.show : ''}`}>

                    <Link className={styles.button} href={'/'}>Мій акаунт</Link>

                    <Link href={'/favourites'} className={styles.button}>
                        Обране
                    </Link >

                    <Link href={'/orders'} className={styles.button}
                    >Заброньоване</Link>
                </div >

            }


        </>
    )
}