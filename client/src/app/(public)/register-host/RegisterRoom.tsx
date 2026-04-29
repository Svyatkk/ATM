'use client'
import { IFormRoom } from "@/types/IFormRoom.interface"
type Props = {
    roomData: IFormRoom,
    onChange: (id: string, field: keyof IFormRoom, value: any) => void
}
import styles from './page.module.css'


export default function RegisterRoom({ roomData, onChange }: Props) {
    return (
        <div className={styles.roomCard}>
            <h4>Налаштування кімнати</h4>

            <div className={styles.roomInputGroup}>
                <label>Номер кімнати</label>
                <input
                    className={styles.inputReg}
                    type="text"
                    placeholder="Наприклад: 101"
                    value={roomData.roomNumber}
                    onChange={(e) => onChange(roomData.id, 'roomNumber', e.target.value)}
                />
            </div>

            <div className={styles.roomInputGroup}>
                <label>Тип кімнати</label>
                <input
                    className={styles.inputReg}
                    type="text"
                    placeholder="Наприклад: Стандарт"
                    value={roomData.roomType}
                    onChange={(e) => onChange(roomData.id, 'roomType', e.target.value)}
                />
            </div>

            <div className={styles.roomInputGroup}>
                <label>Ціна за ніч</label>
                <input
                    className={styles.inputReg}
                    type="number"
                    placeholder="0"
                    value={roomData.pricePerNight || ''}
                    onChange={(e) => onChange(roomData.id, 'pricePerNight', Number(e.target.value))}
                />
            </div>

            <div className={styles.roomInputGroup}>
                <label>Місткість (осіб)</label>
                <input
                    className={styles.inputReg}
                    type="number"
                    placeholder="1"
                    value={roomData.capacity || ''}
                    onChange={(e) => onChange(roomData.id, 'capacity', Number(e.target.value))}
                />
            </div>
        </div>
    )
}
