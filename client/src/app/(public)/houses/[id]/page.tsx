import PageHotel from '../PageHotel'
import { houseService } from '@/api/house.service';
type Props = {
    params: Promise<{ id: string }>
}

export default async function HotelPage({ params }: Props) {
    const { id } = await params;

    const hostData = await houseService.gethouseByid(Number(id))

    return (
        <>


            <PageHotel children={hostData} />
        </>
    )
}