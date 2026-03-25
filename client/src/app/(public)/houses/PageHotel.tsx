'use client'
import styles from './[id]/page.module.css'
import { IHost } from "@/types/host.interface"


type Props = {
    children: IHost
}

export default function Hotel({ children }: Props) {

    return (
        <>

            <div className={styles.pageHotel}>

                {children.name}
            </div >
        </>
    )
}