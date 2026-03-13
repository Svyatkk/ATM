'use client'

import styles from './SearchingPanel.module.css'
import Image from 'next/image'
export default function SearchingPanel() {
    return (
        <>
            <div className={styles.searchingPanels}>

                <label className={styles.panelCity} >
                    <span>
                        <Image height={30} width={30} src={'/img/bedLogo.png'} alt='Bed'>
                        </Image>
                    </span>
                    <input type="text" />
                </label>

                <label className={styles.panelData} >
                    <span>
                        <Image height={30} width={30} src={'/img/calendarLogo.png'} alt='Bed'>
                        </Image>
                    </span>
                    <input type="month" />
                </label>


                <label className={styles.panelCountPeople} >
                    <span>
                        <Image height={30} width={30} src={'/img/profileLogo.png'} alt='Bed'>
                        </Image>
                    </span>

                    <input type="date" />
                </label>
                <button className={styles.find}>Шукати</button>
            </div>
        </>
    )
}


