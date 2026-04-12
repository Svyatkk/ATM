'use client'
import { useState } from "react"
import styles from './styles.module.css'
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PanelButtons from "../PanelButtons/PanelButtons"
type Props = {
    show: boolean | null


}

export default function DropDownMenuProfile({ show }: Props) {

    const route = useRouter()

    return (
        <>
            {
                <div
                    className={`${styles.block} ${show ? styles.show : ''}`}
                >


                    <PanelButtons></PanelButtons>

                </div >

            }


        </>
    )
}