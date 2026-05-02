const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        title: 'Bosh sahifa',
        component: () => import('@/views/dashboard/Dashboard.vue'),
    },
    {
        path: '/employee-management',
        name: 'EmployeeManagement',
        icon: 'employee-management',
        title: 'Hodimlar boshqaruvi',
        component: () => import('@/views/employee/EmployeeManagement.vue'),
    },
    // {
    //     path: '/real-time-map',
    //     name: 'RealTimeMap',
    //     icon: 'real-time-map',
    //     title: 'Monitoring',
    //     component: () => import('@/views/employee/EmployeeManagement.vue'),
    // },
    {
        path: '/trucks',
        name: 'Trucks',
        icon: 'trucks',
        title: 'Transportlar',
        component: () => import('@/views/transport/Transport.vue'),
    },
    {
        path: '/loads',
        name: 'Loads',
        icon: 'loads',
        title: 'Yuklar',
        component: () => import('@/views/loads/Loads.vue'),
    },
    {
        path: '/routes',
        name: 'Routes',
        icon: 'routes',
        title: 'Marshrutlar',
        component: () => import('@/views/routes/Routes.vue'),
    },
    // {
    //     path: '/kpi-efficiency',
    //     name: 'KpiAndEfficiency',
    //     icon: 'efficiency',
    //     title: 'KPI va Samaradorlik',
    //     component: () => import('@/views/employee/EmployeeManagement.vue'),
    // },
    {
        path: '/reports',
        name: 'Reports',
        redirect: 'reports/employee-reports',
        icon: 'reports',
        title: 'Hisobotlar',
        component: () => import('@/views/reports/Reports.vue'),
        children: [
            {
                path: '/reports/employee-reports',
                name: 'EmployeeReports',
                icon: 'reports',
                title: 'Hodim hisobotlari',
                component: () => import('@/views/reports/EmployeeReports.vue')
            },
            {
                path: '/reports/loads-reports',
                name: 'LoadsReports',
                icon: 'reports',
                title: 'Yuklar bo\'yicha hisobotlar',
                component: () => import('@/views/reports/LoadsReports.vue')
            },
            {
                path: '/reports/financial-statements',
                name: 'FinancialStatements',
                icon: 'reports',
                title: 'Moliyaviy hisobotlar',
                component: () => import('@/views/reports/FinancialStatements.vue')
            },
            {
                path: '/reports/monitoring-territories',
                name: 'MonitoringTerritories',
                icon: 'reports',
                title: 'Hududlar monitoringi',
                component: () => import('@/views/reports/MonitoringTerritories.vue')
            },
            // {
            //     path: '/reports/routes-statistics',
            //     name: 'RoutesStatistics',
            //     icon: 'reports',
            //     title: 'Marshrutlar hisobotlari',
            //     component: () => import('@/views/reports/RoutesStatistics.vue')
            // }
        ]
    },
    // {
    //     path: '/settings',
    //     name: 'Settings',
    //     icon: 'settings',
    //     title: 'Sozlamalar',
    //     component: () => import('@/views/settings/Settings.vue'),
    // }
]

export default routes
