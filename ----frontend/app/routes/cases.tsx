import { useLoaderData } from "react-router";
import { casesApi } from "../api/cases";
import CasesGrid from "../components/cases-grid";

export async function loader() {
    const cases = await casesApi.getAll();
    return { cases };
}

export default function Case() {
    const { cases } = useLoaderData<typeof loader>();

    return <CasesGrid cases={cases.slice(0, 8)} />
}
