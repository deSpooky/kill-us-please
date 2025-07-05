import Hero from "../components/hero";

import { useLoaderData } from "react-router";
import { casesApi } from "../api/cases";
import CasesGrid from "../components/cases-grid";
import { useState } from "react";

export async function loader() {
    const cases = await casesApi.getAll();
    return { cases };
}

export default function Home() {
    const { cases } = useLoaderData<typeof loader>();
    const [quantity, setQuantity] = useState(8)

    return (
        <>
            <Hero />
            <CasesGrid cases={cases.slice(0, quantity)} />
            <a href={`#card_${quantity-1}`} onClick={() => setQuantity(quantity => quantity + 8)}>Load More</a>
        </>
    );
}
