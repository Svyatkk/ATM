'use client'

import styles from './page.module.css'
import { IHost, hostTypeOptions } from '@/types/host.interface'
import { houseService } from '@/api/house.service'
import { useEffect, useState, useCallback } from 'react'
import BlockHotel from '@/components/BlockHotel/BlockHotel'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    city: string
    capacity: number
    type?: string
    animals?: boolean
    checkIn?: string
    checkOut?: string
}

type SortOption = 'default' | 'price_asc' | 'price_desc'

export default function FindPage({ city, capacity, type, animals, checkIn, checkOut }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [hosts, setHosts] = useState<IHost[]>([])
    const [loading, setLoading] = useState(true)

    const [maxPrice, setMaxPrice] = useState<number>(10000)
    const [sortBy, setSortBy] = useState<SortOption>('default')

    const [selectedType, setSelectedType] = useState<string>(type || '')
    const [allowsPets, setAllowsPets] = useState<boolean>(animals || false)
    const [localCheckIn, setLocalCheckIn] = useState<string>(checkIn || '')
    const [localCheckOut, setLocalCheckOut] = useState<string>(checkOut || '')

    useEffect(() => {
        setLoading(true)
        houseService
            .getSearchedHouses(city, capacity, checkIn || undefined, checkOut || undefined, type || undefined, animals || undefined)
            .then((data) => setHosts(Array.isArray(data) ? data : []))
            .catch((err) => {
                setHosts([])
            })
            .finally(() => setLoading(false))
    }, [city, capacity, type, animals, checkIn, checkOut])

    const getMinPrice = (host: IHost): number => {
        if (!host.roomTypes || host.roomTypes.length === 0) return Infinity
        return Math.min(...host.roomTypes.map((rt) => rt.pricePerNight))
    }

    const processedHosts = hosts
        .filter((host) => {
            const minPrice = getMinPrice(host)
            return minPrice <= maxPrice
        })
        .sort((a, b) => {
            if (sortBy === 'price_asc') return getMinPrice(a) - getMinPrice(b)
            if (sortBy === 'price_desc') return getMinPrice(b) - getMinPrice(a)
            return 0
        })

    const applyServerFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('city', city)
        params.set('capacity', String(capacity))

        if (selectedType) params.set('type', selectedType)
        else params.delete('type')

        if (allowsPets) params.set('animals', 'true')
        else params.delete('animals')

        if (localCheckIn) params.set('checkIn', localCheckIn)
        else params.delete('checkIn')

        if (localCheckOut) params.set('checkOut', localCheckOut)
        else params.delete('checkOut')

        router.push(`/find?${params.toString()}`)
    }, [city, capacity, selectedType, allowsPets, localCheckIn, localCheckOut, searchParams, router])

    const resetFilters = () => {
        setSelectedType('')
        setAllowsPets(false)
        setLocalCheckIn('')
        setLocalCheckOut('')
        setMaxPrice(10000)
        setSortBy('default')
        router.push(`/find?city=${encodeURIComponent(city)}&capacity=${capacity}`)
    }

    const activeFiltersCount = [
        selectedType,
        allowsPets,
        localCheckIn,
        maxPrice < 10000,
    ].filter(Boolean).length

    return (
        <div className={styles.mainContainer}>
            <aside className={styles.sideBlock}>
                <div className={styles.sideHeader}>
                    <h2 className={styles.sideTitle}>Фільтри</h2>
                    {activeFiltersCount > 0 && (
                        <button className={styles.resetBtn} onClick={resetFilters}>
                            Скинути ({activeFiltersCount})
                        </button>
                    )}
                </div>

                <div className={styles.filterGroup}>
                    <p className={styles.filterLabel}>Тип житла</p>
                    <div className={styles.typeGrid}>
                        {hostTypeOptions.map((opt) => (
                            <button
                                key={opt.name}
                                className={`${styles.typeBtn} ${selectedType === opt.name ? styles.typeBtnActive : ''}`}
                                onClick={() => setSelectedType(prev => prev === opt.name ? '' : opt.name)}
                            >
                                {opt.name === 'Apartment'}
                                {opt.name === 'Home'}
                                {opt.name === 'House'}
                                <span>{opt.name}</span>
                            </button>
                        ))}
                    </div>
                </div>


                <div className={styles.filterGroup}>
                    <p className={styles.filterLabel}>Умови проживання</p>
                    <label className={styles.toggle}>
                        <span className={styles.toggleLabel}>Дозволені тварини</span>
                        <div className={styles.toggleSwitch} onClick={() => setAllowsPets(p => !p)}>
                            <div className={`${styles.toggleThumb} ${allowsPets ? styles.toggleThumbOn : ''}`} />
                        </div>
                    </label>
                </div>

                <div className={styles.filterGroup}>
                    <p className={styles.filterLabel}>Дати проживання</p>
                    <div className={styles.dateRow}>
                        <div className={styles.dateField}>
                            <label className={styles.dateLabel}>Заїзд</label>
                            <input
                                type="date"
                                className={styles.dateInput}
                                value={localCheckIn}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setLocalCheckIn(e.target.value)}
                            />
                        </div>
                        <div className={styles.dateField}>
                            <label className={styles.dateLabel}>Виїзд</label>
                            <input
                                type="date"
                                className={styles.dateInput}
                                value={localCheckOut}
                                min={localCheckIn || new Date().toISOString().split('T')[0]}
                                onChange={(e) => setLocalCheckOut(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <p className={styles.filterLabel}>
                        Макс. ціна: <strong>{maxPrice} грн/ніч</strong>
                    </p>
                    <input
                        type="range"
                        min={100}
                        max={10000}
                        step={100}
                        value={maxPrice}
                        className={styles.priceSlider}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                    <div className={styles.priceRange}>
                        <span>100 грн</span>
                        <span>10 000 грн</span>
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <p className={styles.filterLabel}>↕ Сортування</p>
                    <select
                        className={styles.sortSelect}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                    >
                        <option value="default">За замовчуванням</option>
                        <option value="price_asc">Ціна: від дешевих</option>
                        <option value="price_desc">Ціна: від дорогих</option>
                    </select>
                </div>

                <button className={styles.applyBtn} onClick={applyServerFilters}>
                    Застосувати фільтри
                </button>
            </aside>

            <main className={styles.hotels}>
                <div className={styles.resultsHeader}>
                    <div>
                        <h1 className={styles.resultsTitle}>Результати пошуку</h1>
                        <p className={styles.resultsSubtitle}>
                            {city} · {capacity} {capacity === 1 ? 'гість' : capacity < 5 ? 'гості' : 'гостей'}
                            {type && ` · ${type}`}
                            {animals}
                        </p>
                    </div>
                    <span className={styles.resultCount}>
                        {loading ? '…' : `${processedHosts.length} варіантів`}
                    </span>
                </div>

                {loading ? (
                    <div className={styles.loadingWrap}>
                        <div className={styles.spinner} />
                        <p>Шукаємо житло…</p>
                    </div>
                ) : processedHosts.length > 0 ? (
                    <div className={styles.hotelsList}>
                        {processedHosts.map((host) => (
                            <BlockHotel inSearch={true} host={host} key={host.id} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>
                        <span className={styles.noResultsIcon}></span>
                        <p>За вашими фільтрами нічого не знайдено.</p>
                        <button className={styles.resetBtnInline} onClick={resetFilters}>
                            Скинути фільтри
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}