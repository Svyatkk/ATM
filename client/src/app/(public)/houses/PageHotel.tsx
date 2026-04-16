'use client'
import styles from '../houses/[id]/pageHotel.module.css'
import { IHost } from "@/types/host.interface"
import { useState, useEffect } from 'react'
import { bookingService } from '@/api/booking.service'
import { useRouter } from 'next/navigation'
type Props = {
    host: IHost
}

export default function PageHotel({ host }: Props) {
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [availableRoomTypes, setAvailableRoomTypes] = useState(host.roomTypes ?? [])
    const router = useRouter();

    useEffect(() => {
        if (checkIn && checkOut && datesAreValid(checkIn, checkOut)) {
            setAvailableRoomTypes(getAvailableRoomTypes(host.roomTypes ?? [], checkIn, checkOut));
        } else {
            setAvailableRoomTypes(host.roomTypes ?? []);
        }
    }, [host.roomTypes]);

    const parseDate = (dateString: string) => new Date(dateString)

    const datesAreValid = (checkInDate: string, checkOutDate: string) => {
        if (!checkInDate || !checkOutDate) return false
        return parseDate(checkInDate) < parseDate(checkOutDate)
    }

    const hasDateOverlap = (start: Date, end: Date, bookedStart: Date, bookedEnd: Date) => {
        return start < bookedEnd && end > bookedStart
    }

    const isRoomAvailable = (roomType: any, checkInDate: string, checkOutDate: string) => {
        const start = parseDate(checkInDate);
        const end = parseDate(checkOutDate);

        if (!roomType.rooms || roomType.rooms.length === 0) return false;

        return roomType.rooms.some((room: any) => {
            if (!room.bookings || room.bookings.length === 0) return true;

            const hasOverlap = room.bookings.some((booking: any) => {
                if (booking.status === 'CANCELLED') return false;

                const bookedStart = parseDate(booking.checkIn);
                const bookedEnd = parseDate(booking.checkOut);
                return hasDateOverlap(start, end, bookedStart, bookedEnd);
            });
            console.log("Дані кімнат з бекенда:", host.roomTypes);
            return !hasOverlap;
        });
    }

    const getAvailableRoomTypes = (roomTypes: any[], checkInDate: string, checkOutDate: string) => {
        return roomTypes.filter((roomType) => isRoomAvailable(roomType, checkInDate, checkOutDate))
    }

    const handleApplyDates = () => {
        if (!checkIn || !checkOut) {
            alert("Будь ласка, оберіть дати заїзду та виїзду перед перевіркою доступності!")
            return
        }

        if (!datesAreValid(checkIn, checkOut)) {
            alert("Дата виїзду повинна бути пізніше дати заїзду!")
            return
        }

        const filteredRooms = getAvailableRoomTypes(host.roomTypes ?? [], checkIn, checkOut)
        setAvailableRoomTypes(filteredRooms)

        if (filteredRooms.length === 0) {
            alert("На ці дати немає доступних кімнат.")
        }
    }

    const handleBook = async (roomType: any) => {
        if (!checkIn || !checkOut) {
            alert("Будь ласка, оберіть дати заїзду та виїзду перед бронюванням!");
            return;
        }

        if (!datesAreValid(checkIn, checkOut)) {
            alert("Дата виїзду повинна бути пізніше дати заїзду!");
            return;
        }

        const startDate = parseDate(checkIn);
        const endDate = parseDate(checkOut);

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
            alert("Кімнату успішно заброньовано!");

            setCheckIn('');
            setCheckOut('');


            router.refresh();

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

                    <button className={styles.saveChange} onClick={handleApplyDates}>Застосувати зміни</button>
                </div>
            </div>

            <div className={styles.roomsSection}>
                <h2 className={styles.sectionTitle}>Доступні варіанти розміщення</h2>

                {availableRoomTypes && availableRoomTypes.length > 0 ? (
                    <div className={styles.roomsGrid}>
                        {availableRoomTypes.map((room, index) => (
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
                                            <span className={styles.priceNote}>за ніч</span>
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
                    <p className={styles.noRooms}>На жаль, на обрані дати немає доступних кімнат.</p>
                )}
            </div>
        </div>
    )
}