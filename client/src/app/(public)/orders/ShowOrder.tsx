'use client'

import { IRoomType } from "@/types/roomtype.interface"
import { useEffect } from "react"
import { useState } from "react"
import { bookingService } from "@/api/booking.service"
import { data } from "react-router-dom"
import { IBooking } from "@/types/booking.interface"
export default function ShowOrder() {


    const [room, setRoom] = useState<IBooking | null>()


    useEffect(() => {
        bookingService.getBooking()
            .then(data => setRoom(data))
            .catch(err => console.log(err))



    }, [])



    return (
        <>

            {room?.totalPrice}
        </>
    )
}