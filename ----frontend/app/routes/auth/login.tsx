import type { Route } from "./+types/signup";
import { useFetcher, redirect, data } from "react-router";
import { LoginForm } from "../../components/auth";
import type { LoginCredentials, LoginCredentialsErrors } from "app/types";

import {
    getSession,
    commitSession,
} from "../../sessions.server";
import { authApi } from "../../api/auth";


export async function loader({
    request,
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("userId")) {
        return redirect("/cases");
    }

    return data(
        { error: session.get("error") },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        }
    );
}

export async function action({
    request,
}: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const errors: LoginCredentialsErrors = {};

    if (!email.includes("@")) {
        errors.email = "Invalid email address";
    }

    if (password.length < 12) {
        errors.password =
            "Password should be at least 12 characters";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    const result = await authApi.login({ email, password })
    if ("error" in result) {
        session.flash("error", result.error);

        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    const { user } = result

    session.set("userId", String(user.id));

    return redirect("/cases", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function Login({ loaderData }: Route.ComponentProps) {
    const { error } = loaderData;
    return <LoginForm error={error} />
}

