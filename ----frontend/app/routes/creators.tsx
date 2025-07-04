import { Link, useLoaderData } from "react-router";
import { creatorsApi } from "../api/creators";
import dummyAvatar from '../assets/dummy-avatar.png'

export async function loader() {
    const creators = await creatorsApi.getAll();
    return { creators };
}

export default function Creators() {
    const { creators } = useLoaderData<typeof loader>();

    return (
        <main style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 40 }}>
            {creators.map(({ id,
                first_name,
                last_name,
                email,
                creator_description,
                avatar,
                tag }) => (
                <Link key={`creator_${id}`} to={`/creators/${id}`}>
                    <article style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <img src={dummyAvatar} alt="avatar" />
                        <span>{last_name} {first_name}</span>
                        <span>{email}</span>
                        <span>{creator_description}</span>
                        <span>{tag}</span>
                    </article>
                </Link>
            ))}
        </main>
    )
}
