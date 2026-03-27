'use client'
import styles from '../houses/[id]/pageHotel.module.css'
import { IHost } from "@/types/host.interface"
import { useState } from 'react'
import { bookingService } from '@/api/booking.service'

type Props = {
    host: IHost
}

export default function PageHotel({ host }: Props) {
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleBook = async (roomType: any) => {
        if (!checkIn || !checkOut) {
            alert("Будь ласка, оберіть дати заїзду та виїзду перед бронюванням!");
            return;
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);

        if (startDate >= endDate) {
            alert("Дата виїзду повинна бути пізніше дати заїзду!");
            return;
        }

        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const calculatedTotalPrice = diffDays * roomType.pricePerNight;

        const payload = {
            checkIn,
            checkOut,
            roomTypeId: roomType.id,
            totalPrice: calculatedTotalPrice,
            childrenCount: 0,
            status: "PENDING"
        };

        try {
            setIsLoading(true);
            await bookingService.createBooking(payload as any);
            alert("Кімнату успішно забронювано!");
            setCheckIn('');
            setCheckOut('');
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Сталася помилка при бронюванні. Можливо, на ці дати немає вільних кімнат.");
        } finally {
            setIsLoading(false);
        }
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className={styles.container}>
            {/* Секція інформації про готель */}
            <div className={styles.header}>
                <h1 className={styles.title}>{host.name}</h1>
                <p className={styles.address}>
                    <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {host.address}
                </p>
                {host.type && <span className={styles.badge}>{host.type.name}</span>}
            </div>

            <div className={styles.datePickerCard}>
                <h3 className={styles.datePickerTitle}>Оберіть дати проживання</h3>
                <div className={styles.dateInputs}>
                    <div className={styles.inputGroup}>
                        <label>Дата заїзду</label>
                        <input
                            type="date"
                            value={checkIn}
                            min={today}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className={styles.dateInput}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Дата виїзду</label>
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn || today}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className={styles.dateInput}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.roomsSection}>
                <h2 className={styles.sectionTitle}>Доступні варіанти розміщення</h2>

                {host.roomTypes && host.roomTypes.length > 0 ? (
                    <div className={styles.roomsGrid}>
                        {host.roomTypes.map((room, index) => (
                            <div className={styles.roomCard} key={index}>
                                <div className={styles.roomImagePlaceholder}>
                                    <svg fill="none" stroke="#ccc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>

                                <div className={styles.roomContent}>
                                    <h3 className={styles.roomName}>{room.name}</h3>

                                    <div className={styles.roomFeatures}>
                                        <span className={styles.feature}>
                                            <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            До {room.capacity} гостей
                                        </span>
                                    </div>

                                    <div className={styles.roomFooter}>
                                        <div className={styles.priceContainer}>
                                            <span className={styles.price}>{room.pricePerNight} ₴</span>
                                            <span className={styles.priceNote}>/ ніч</span>
                                        </div>

                                        <button
                                            className={styles.bookButton}
                                            onClick={() => handleBook(room)}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Бронюємо...' : 'Забронювати'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.noRooms}>На жаль, інформації про кімнати поки немає.</p>
                )}
            </div>
        </div>
    )
}
