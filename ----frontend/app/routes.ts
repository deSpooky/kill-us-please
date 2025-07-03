import type { RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from '@react-router/dev/routes'

export default [
    layout('layouts/header.tsx', [
        index('routes/home.tsx'),

        route('cases', 'routes/cases.tsx'),
        route('cases/:caseId', 'routes/case.tsx')
    ]),
    layout('layouts/auth.tsx', [
        route('login', 'routes/auth/login.tsx'),
        route('signup', 'routes/auth/signup.tsx'),
        route('remind-password', 'routes/auth/remind-password.tsx')
    ])
] satisfies RouteConfig;
