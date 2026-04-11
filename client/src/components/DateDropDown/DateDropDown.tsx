
'use client'
import { useState } from 'react'
import styles from './style.module.css'

type Props = {
    show: boolean | null
    checkIn?: string | ''
    checkOut?: string | '',
    setCheckIn: (date: string) => void;
    setCheckOut: (date: string) => void;

}




export default function DateDropDown({ show, checkIn, checkOut, setCheckIn, setCheckOut }: Props) {



    return (
        <>

            <div onClick={(e) => { e.stopPropagation() }} className={`${styles.block} ${show ? styles.show : ''}`}>
                <label htmlFor="">
                    <p>Дата в'їзду</p>

                    <input value={checkIn} onChange={(e) => {
                        setCheckIn(e.target.value)
                    }} type="date" />
                </label>
                <label htmlFor="">
                    <p>Дата виїзду</p>



                    <input value={checkOut} onChange={(e) => {
                        setCheckOut(e.target.value)

                    }} type="date" />
                </label>
            </div>


        </>
    )
}