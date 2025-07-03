import type { RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from '@react-router/dev/routes'

export default [
    layout('layouts/header.tsx', [
        index('routes/home.tsx'),

        route('cases', 'routes/cases.tsx'),
        route('cases/:caseId', 'routes/case.tsx')
    ])
] satisfies RouteConfig;
