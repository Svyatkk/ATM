'use client'

import styles from './style.module.css'
import DropDownMenuProfile from '../DropDownMenuProfile/DropDownMenuProfile'
import RegisterHostButton from '../ButtonRegisterOwnHost/ButtonRegisterOwnHost'
import { IUser } from '@/types/user.interface'
import { useState } from 'react'
import PanelButtons from '../PanelsButtons/PanelButtons'
type Props = {
    show?: boolean
}

export default function SideBar({ show }: Props) {
    const [user, setUser] = useState<IUser | null>(null)

    return (
        <>

            <div className={`${styles.block} ${show ? styles.show : ''}`}>

                <PanelButtons></PanelButtons>
                <RegisterHostButton></RegisterHostButton>

            </div>
        </>
    )
}