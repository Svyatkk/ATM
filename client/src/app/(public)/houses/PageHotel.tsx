'use client'
import styles from './[id]/page.module.css'
import { IHost } from "@/types/host.interface"
import { useState } from 'react'
import { bookingService } from '@/api/booking.service'

type Props = {
    host: IHost
}

export default function Hotel({ host }: Props) {
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')

    const handleBook = async (roomType: any) => {
        if (!checkIn || !checkOut) {
            alert("Будь ласка, оберіть дати заїзду та виїзду!");
            return;
        }

        const payload = {
            checkIn,
            checkOut,
            roomTypeId: roomType.id,
            totalPrice: roomType.pricePerNight,
            childrenCount: 0,
            status: "PENDING"
        };

        try {
            await bookingService.createBooking(payload as any);
            alert("Успішно забронювано!");
        } catch (err) {
            console.log(err);
            alert("Помилка бронювання");
        }
    }

    return (
        <div className={styles.pageHotel}>
            <h2>{host.name}</h2>

            <div style={{ marginBottom: '20px', padding: '10px', background: '#eee' }}>
                <label>
                    Заїзд: <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </label>
                <label style={{ marginLeft: '10px' }}>
                    Виїзд: <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </label>
            </div>


            <div className={styles.rooms}>
                <h3>Кімнати:</h3>
                {host.roomTypes?.map((room, index) => {
                    return (
                        <div className={styles.room} key={index}>
                            <div>{room.name}</div>
                            <div>Ціна: {room.pricePerNight}</div>
                            <div>Кількість місць: {room.capacity}</div>

                            <button onClick={() => handleBook(room)}>Забронювати</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}