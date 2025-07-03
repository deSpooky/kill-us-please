import type { Route } from "./+types/signup";
import { useFetcher, redirect, data } from "react-router";
import { LoginForm } from "../../components/auth";
import type { LoginCredentials, LoginCredentialsErrors } from "app/types";

export async function action({
    request,
}: Route.ActionArgs) {
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

    return redirect("/cases");
}

export default function Login(_: Route.ComponentProps) {
    return <LoginForm />
}

