import { Form, Link, Outlet } from "react-router";
// import { creatorsApi } from "../api/creators";
import type { Route } from "./+types/header";
import Header from "../components/header";

// export async function dataLoader() {
//     return { creator };
// }

export default function NavLayout({
    loaderData,
}: Route.ComponentProps) {
    // const { creator } = loaderData;

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
