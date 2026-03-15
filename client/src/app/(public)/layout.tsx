import React from "react"
import NavBar from "@/components/NavBar/NavBar"
import styles from './page.module.css'

type Props = {
    children: React.ReactNode
}


export default function Layout({ children }: Props) {
    return (
        <>

            <header className={styles.headerBackground}>
                <div className={styles.container}>
                    <NavBar />

                    <h1>Знайдіть помешкання для наступної подорожі</h1>

                </div>
            </header>

            <div className={styles.mainContent}>
                <div className={styles.container}>


                    {children}
                </div>
            </div>
        </>
    )
}