import type { RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from '@react-router/dev/routes'

export default [
    layout('layouts/sidebar.tsx', [
        index('routes/home.tsx'),
        route('cases/:caseId', 'routes/cases.tsx')
    ])
] satisfies RouteConfig;
