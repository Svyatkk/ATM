import React from "react"
import NavBar from "@/components/NavBar/NavBar"
import styles from './page.module.css'

type Props = {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <div className={styles.layoutContainer}>
                <div className={styles.container}>
                    <div className={styles.section1}>
                        {children}

                    </div>

                    <div className={styles.section2}>
                        <p>Advanced</p>
                        <p>Tourist</p>
                        <p>Matching</p>

                    </div>
                </div>

            </div>
        </>
    )
}