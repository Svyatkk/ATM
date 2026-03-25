import FindPage from "./FindPage"

type PageProps = {
    searchParams: Promise<{ city?: string; capacity?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;

    const city = params.city || "";
    const capacity = Number(params.capacity) || 1;


    return (
        <>
            {city ? (
                <FindPage city={city} capacity={capacity} />
            ) : (
                <p style={{ textAlign: "center", marginTop: "50px" }}>Введіть місто для пошуку</p>
            )}
        </>
    )
}