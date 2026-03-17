import PageHotel from '../PageHotel'

type Props = {
    params: Promise<{ id: string }>
}

export default async function HotelPage({ params }: Props) {
    const { id } = await params;

    const res = await fetch(`http://localhost:3001/api/houses/${id}`);

    if (!res.ok) {
        return <div>Помилка: Житло не знайдено</div>;
    }

    const hostData = await res.json();

    return (
        <>
            <PageHotel children={hostData} />
        </>
    )
}