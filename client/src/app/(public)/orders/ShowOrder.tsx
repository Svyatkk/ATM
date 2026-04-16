'use client'

import { IRoomType } from "@/types/roomtype.interface"
import { useEffect } from "react"
import { useState } from "react"
import { bookingService } from "@/api/booking.service"
import { data } from "react-router-dom"
import { IBooking } from "@/types/booking.interface"
import styles from './style.module.css'
export default function ShowOrder() {
    const [rooms, setRoom] = useState<IBooking[]>([])

    useEffect(() => {
        bookingService.getBooking()
            .then(data => setRoom(data))
            .catch(err => console.log(err))
    }, [])


    const handleRemoveOrder = async (bookingId: number) => {
        try {
            bookingService.removeOrder(bookingId)


            setRoom(prevRooms => prevRooms.filter(room => room.id !== bookingId));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Мої бронювання</h2>

            {rooms?.length === 0 ? (
                <p className={styles.empty}>У вас поки немає активних бронювань.</p>
            ) : (
                <div className={styles.grid}>
                    {rooms?.map((room) => {
                        const checkInDate = new Date(room.checkIn).toLocaleDateString('uk-UA');
                        const checkOutDate = new Date(room.checkOut).toLocaleDateString('uk-UA');

                        const statusClass = room.status ? room.status.toLowerCase() : 'pending';

                        return (
                            <div className={styles.card} key={room.id}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.orderNumber}>Замовлення #{room.id}</span>
                                    <span className={`${styles.status} ${styles[statusClass]}`}>
                                        {room.status === 'PENDING' ? 'Очікує' :
                                            room.status === 'CONFIRMED' ? 'Підтверджено' : 'Скасовано'}
                                    </span>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Заїзд:</span>
                                        <span className={styles.value}>{checkInDate}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Виїзд:</span>
                                        <span className={styles.value}>{checkOutDate}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Кімната:</span>
                                        <span className={styles.value}>{room.room?.roomNumber || 'Не вказано'}</span>


                                    </div>

                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Готель:</span>

                                        <span className={styles.value}>{room.room.roomType?.House?.name}</span>
                                    </div>

                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Скасувати:</span>

                                        <span onClick={() => {
                                            handleRemoveOrder(room.id)
                                        }} className={styles.value}>Скасувати замовлення</span>
                                    </div>
                                </div>

                                <div className={styles.cardFooter}>
                                    <span className={styles.priceLabel}>До оплати:</span>
                                    <span className={styles.priceValue}>{room.totalPrice} ₴</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}