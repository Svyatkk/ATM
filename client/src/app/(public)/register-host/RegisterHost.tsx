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
import Image from 'next/image'
export default function RegisterHost() {

    const [type, setType] = useState<HostType['name'] | null>()

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

                    <SwiperSlide className={styles.slide}></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}