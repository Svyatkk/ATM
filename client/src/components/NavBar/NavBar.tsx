'use client'
import styles from './NavBar.module.css'
import Image from 'next/image'
export default function NavBar() {
    return (
        <>


            <nav className={styles.nav}>
                <h1>ATM</h1>

                <div className={styles.useBlock}>
                    <button>Зареєструвати власне помешкання</button>
                    <Image className={styles.heart} height={32} width={32} alt='heart' src={'/img/heart.png'}></Image>
                    <span className={styles.userAvatar}></span>

                    <div className={styles.text}>
                        <p>Username</p>
                        <p>text</p>
                    </div>
                </div>
            </nav >
        </>
    )
}

