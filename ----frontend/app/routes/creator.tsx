import { Form, useLoaderData } from "react-router";

import { creatorsApi } from "../api/creators";
import { casesApi } from "../api/cases";
import type { Route } from "./+types/creator";
import ProfileCard from "../components/profile-card";
import ProjectsGrid from "../components/projects-grid";

export async function loader({ params }: Route.LoaderArgs) {
    const creatorRecord = await creatorsApi.get(+params.creatorId);
    if (!creatorRecord) {
        throw new Response("Not Found", { status: 404 });
    }

    const creatorCases = await casesApi.getAll({ byCreator: +params.creatorId })

    return { creatorRecord, creatorCases };
}

export default function Creator() {
    const { creatorRecord, creatorCases } = useLoaderData<typeof loader>();
    return (
        <div style={{ display: 'flex', padding: '40px', gap: '40px', alignItems: 'flex-start' }}>
            <ProfileCard {...creatorRecord} />
            <ProjectsGrid projects={creatorCases} />
        </div>
    )
}
