import { AuthWrapper } from "../components/auth";
import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <>
            <AuthWrapper>
                <Outlet />
            </AuthWrapper>
        </>
    )
}
