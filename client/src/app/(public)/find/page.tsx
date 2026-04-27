import { Suspense } from "react"
import FindPage from "./FindPage"

type PageProps = {
    searchParams: Promise<{
        city?: string;
        capacity?: string;
        type?: string;
        animals?: string;
        checkIn?: string;
        checkOut?: string;
    }>;
};


export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;

    const city = params.city || "";
    const capacity = Number(params.capacity) || 1;
    const type = params.type || "";
    const animals = params.animals === "true";
    const checkIn = params.checkIn || "";
    const checkOut = params.checkOut || "";

    return (
        <>
            {city ? (
                <Suspense fallback={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <div style={{ textAlign: 'center', color: '#6366f1' }}>
                            <div style={{
                                width: 48, height: 48, border: '3px solid #e8ecf0',
                                borderTopColor: '#6366f1', borderRadius: '50%',
                                animation: 'spin 0.7s linear infinite', margin: '0 auto 16px'
                            }} />
                            <p style={{ color: '#64748b', fontSize: '1rem' }}>Завантаження…</p>
                        </div>
                    </div>
                }>
                    <FindPage
                        city={city}
                        capacity={capacity}
                        type={type}
                        animals={animals}
                        checkIn={checkIn}
                        checkOut={checkOut}
                    />
                </Suspense>
            ) : (
                <p style={{ textAlign: "center", marginTop: "80px", color: "#64748b", fontSize: "1.1rem" }}>
                    Введіть місто для пошуку
                </p>
            )}
        </>
    )
}