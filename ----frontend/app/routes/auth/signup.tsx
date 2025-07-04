import type { Route } from "./+types/signup";
import { useFetcher, redirect, data } from "react-router";
import type { SignUpCredentials, SignUpCredentialsErrors } from "app/types";
import { SignupForm } from "../../components/auth";
import { authApi } from "../../api/auth";
import {
    getSession,
    commitSession,
} from "../../sessions.server";

export async function loader({
    request,
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

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
    const confirmPassword = String(formData.get("confirm_password"))

    const errors: SignUpCredentialsErrors = {};

    if (!email.includes("@")) {
        errors.email = "Invalid email address";
    }

    if (password.length < 12) {
        errors.password =
            "Password should be at least 6 characters";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword =
            "Passwords should be equal";
    }

    if (Object.keys(errors).length > 0) {
        return data({ errors }, { status: 400 });
    }

    const result = await authApi.signup({ email, password })
    if ('error' in result) {
        session.flash("error", result.error);

        return redirect("/signup", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    return redirect("/login");
}

export default function Signup(_: Route.ComponentProps) {
    return <SignupForm />
}

