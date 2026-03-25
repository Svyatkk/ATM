'use client'
import { useState } from "react"
import styles from './styles.module.css'
import Image from "next/image"
import { useRouter } from "next/navigation"
type Props = {
    show: boolean


}

export default function DropDownMenuProfile({ show }: Props) {

    const route = useRouter()
    return (
        <>
            {

                <div className={`${styles.block} ${show ? styles.show : ''}`}>
                    <div>somethig</div>
                    <div className={styles.heart} onClick={() => {
                        route.push('/favourites')
                    }}>
                        Обране
                        <Image className={styles.heartImg} height={20} width={20} alt='heart' src={'/img/heart.png'}></Image></div >
                </div>

            }


        </>
    )
}