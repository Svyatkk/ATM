'use client'

import styles from './page.module.css'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { IHost } from '@/types/host.interface'
import { HostType } from '@/types/host.interface'
import { useState } from 'react'
import { hostTypeOptions } from '@/types/host.interface'
import { IUser } from '@/types/user.interface'
import Image from 'next/image'
import { Iroom } from '@/types/room.interface'
import { IRoomType } from '@/types/roomtype.interface'


export default function RegisterHost() {

    const [type, setType] = useState<HostType['name'] | null>()
    const [name, setName] = useState<IHost['name'] | null>()
    const [address, setAddress] = useState<IHost['address'] | null>()
    const [animals, setanimals] = useState<IHost['animals'] | null>()
    const [favouriteBy, setFavouriteBy] = useState<IUser | null>()
    const [city, setCity] = useState<IHost['city'] | null>()




    const [pricePerNight, setPricePerNight] = useState<IRoomType['pricePerNight'] | null>()
    const [capacity, setCapacity] = useState<IRoomType['capacity'] | null>()
    const [roomtype, setRoomType] = useState<IRoomType['name'] | null>()

    const [roomNumber, setRoomNumber] = useState<Iroom['roomNumber'] | null>()





    return (
        <>

            <div className={styles.container}>

                <Swiper
                    className={styles.swiper}
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                >

                    <SwiperSlide className={styles.slide1}>
                        <h2>
                            Оберіть тип
                        </h2>

                        <div className={styles.blocks}>
                            {hostTypeOptions.map((item, index) => {
                                return <div
                                    onClick={() => {
                                        setType(item.name)
                                    }} className={`${styles.block} ${type === item.name ? styles.active : ''}`} key={index}>
                                    <h2>{item.name}</h2>
                                    <Image height={100} width={100} alt='' src={item.hrefimg}></Image>
                                </div>
                            })}
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className={styles.slide2}>


                        <div className={styles.container2}>
                            <div className={styles.row}>
                                <h3>Введіть назву хостелу</h3>
                                <label className={styles.labelReg}>
                                    <input onChange={(e) => {
                                        setName(e.target.value)
                                    }} className={styles.inputReg} type="text" />
                                </label>
                            </div>

                            <div className={styles.row}>
                                <h3>Введіть адресу проживання</h3>
                                <label className={styles.labelReg}>
                                    <input onChange={(e) => {
                                        setAddress(e.target.value)
                                    }} className={styles.inputReg} type="text" />
                                </label>
                            </div>


                            <div className={styles.row}>
                                <h3>Введіть місто</h3>
                                <label className={styles.labelReg}>
                                    <input onChange={(e) => { setCity(e.target.value) }} className={styles.inputReg} type="text" />
                                </label>
                            </div>


                            <div className={styles.row}>
                                <h3>Чи можна тваринам?</h3>
                                <div className={styles.checkbox_wrapper_64}>
                                    <label className={styles.switch}>
                                        <input onChange={() => setanimals(prev => !prev)} type="checkbox" />
                                        <span className={styles.sliderCheck}></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>


                    <SwiperSlide className={styles.slide3}>
                        <div className={styles.container2}>
                            <div className={styles.row}>
                                <h3>Введіть тип номеру</h3>
                                <label className={styles.labelReg}>
                                    <input onChange={(e) => {
                                        setRoomType(e.target.value)

                                    }} className={styles.inputReg} type="text" />
                                </label>
                            </div>

                            <div className={styles.row}>
                                <h3>Введіть номер кімнати</h3>
                                <label className={styles.labelReg}>
                                    <input onChange={(e) => {
                                        setRoomNumber(e.target.value)
                                    }} className={styles.inputReg} type="text" />
                                </label>
                            </div>

                            <div className={styles.row}>
                                <h3>Введіть ціну за ніч</h3>
                                <label className={styles.labelReg}>
                                    <input onChange={(e) => {
                                        setPricePerNight(Number(e.target.value))
                                    }} className={styles.inputReg} type="text" />
                                </label>
                            </div>
                        </div>


                        <button className={styles.register}>Register</button>
                    </SwiperSlide>

                    <SwiperSlide className={styles.slide3}>
                            //Пізніше щось додамо


                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}