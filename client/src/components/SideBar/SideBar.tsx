'use client'

import styles from './style.module.css'

type Props = {
    show?: boolean
}

export default function SideBar({ show }: Props) {



    return (
        <>


            <div className={`${styles.block} ${show ? styles.show : ''}`}>


            </div>
        </>
    )
}