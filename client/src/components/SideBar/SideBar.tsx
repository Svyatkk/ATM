'use client'

import styles from './style.module.css'
import DropDownMenuProfile from '../DropDownMenuProfile/DropDownMenuProfile'
import RegisterHostButton from '../ButtonRegisterOwnHost/ButtonRegisterOwnHost'
type Props = {
    show?: boolean
}

export default function SideBar({ show }: Props) {



    return (
        <>


            <div className={`${styles.block} ${show ? styles.show : ''}`}>


                <RegisterHostButton></RegisterHostButton>
            </div>
        </>
    )
}