import Hero from "../components/hero";

import { useLoaderData } from "react-router";
import { casesApi } from "../api/cases";
import CasesGrid from "../components/cases-grid";

export async function loader() {
    const cases = await casesApi.getAll();
    return { cases };
}

export default function Home() {
    const { cases } = useLoaderData<typeof loader>();

    return (
        <>
            <Hero />
            <CasesGrid cases={cases} />
        </>
    );
}
