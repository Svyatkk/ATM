import { ICity } from "@/types/city.interface"
import { cityService } from "@/api/city.service"
import BlockHotel from "@/components/BlockHotel/BlockHotel"
type Props = {
    params: Promise<{
        name: string
    }>
}

export default async function CityPage({ params }: Props) {



    const resolvedParams = await params;
    const urlName = resolvedParams.name;



    const cityData = await cityService.getCityByName(urlName);

    return (
        <div>
            <h2 >{cityData.name}</h2>



            {cityData.Houses?.map((item) => {
                return <div key={item.id}><BlockHotel host={item}></BlockHotel></div>
            })}
        </div>
    )
}