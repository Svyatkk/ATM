import styles from './NavBar.module.css'


export default function NavBar() {
    return (
        <>


            <nav className={styles.nav}>
                <h1>ATM</h1>


                <div className={styles.useBlock}>
                    <span className={styles.userAvatar}></span>
                    <div className={styles.text}>
                        <p>Username</p>
                        <p>text</p>
                    </div>
                </div>
            </nav>
        </>
    )
}

