'use client'
import { IHost } from "@/types/host.interface"
type Props = {
    children: IHost
}



export default function Hotel({ children }: Props) {

    return (
        <>

            <div>

                {children.name}
            </div>
        </>
    )
}