import type { Route } from "./+types/signup";
import { useFetcher, redirect, data } from "react-router";
import type { SignUpCredentials, SignUpCredentialsErrors } from "app/types";
import { SignupForm } from "../../components/auth";

export async function action({
    request,
}: Route.ActionArgs) {
    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirm_password"))
    console.log(email, password, confirmPassword)

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

    return redirect("/login");
}

export default function Signup(_: Route.ComponentProps) {
    return <SignupForm />
}

