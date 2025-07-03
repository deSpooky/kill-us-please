import { Form, Link, Outlet } from "react-router";
import { casesApi } from "../api/cases";
import type { Route } from "./+types/sidebar";

export async function loader() {
    const cases = await casesApi.getAll();
    return { cases };
}

export default function SidebarLayout({
    loaderData,
}: Route.ComponentProps) {
    const { cases } = loaderData;

    return (
        <>
            <div id="sidebar">
                <h1>
                    <Link to="about">About Page</Link>
                </h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            aria-label="Search cases"
                            id="q"
                            name="q"
                            placeholder="Search"
                            type="search"
                        />
                        <div
                            aria-hidden
                            hidden={true}
                            id="search-spinner"
                        />
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    <ul>
                        {cases.map((caseRecord) => (
                            <li key={caseRecord.id}>
                                <Link to={`cases/${caseRecord.id}`}>
                                    <>{caseRecord.title}</>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav >
            </div >
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
