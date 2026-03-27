'use client'
import { IFormRoom } from "@/types/IFormRoom.interface"
type Props = {
    roomData: IFormRoom,
    onChange: (id: string, field: keyof IFormRoom, value: any) => void
}


export default function RegisterRoom({ roomData, onChange }: Props) {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
            <p>Налаштування кімнати (ID: {roomData.id})</p>

            <div style={{ marginBottom: '10px' }}>
                <label>Номер кімнати: </label>
                <input
                    type="text"
                    value={roomData.roomNumber}
                    onChange={(e) => onChange(roomData.id, 'roomNumber', e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Тип кімнати (Люкс, Стандарт тощо): </label>
                <input
                    type="text"
                    value={roomData.roomType}
                    onChange={(e) => onChange(roomData.id, 'roomType', e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Ціна за ніч: </label>
                <input
                    type="number"
                    value={roomData.pricePerNight || ''}
                    onChange={(e) => onChange(roomData.id, 'pricePerNight', Number(e.target.value))}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Місткість (осіб): </label>
                <input
                    type="number"
                    value={roomData.capacity || ''}
                    onChange={(e) => onChange(roomData.id, 'capacity', Number(e.target.value))}
                />
            </div>

        </div>
    )
}