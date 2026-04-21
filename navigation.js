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
    {
        path: '/real-time-map',
        name: 'RealTimeMap',
        icon: 'real-time-map',
        title: 'Monitoring',
        component: () => import('@/views/employee/EmployeeManagement.vue'),
    },
    {
        path: '/trucks',
        name: 'Trucks',
        icon: 'trucks',
        title: 'Transportlar',
        component: () => import('@/views/employee/EmployeeManagement.vue'),
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
        icon: 'reports',
        title: 'Hisobotlar',
        component: () => import('@/views/employee/EmployeeManagement.vue'),
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: 'settings',
        title: 'Sozlamalar',
        component: () => import('@/views/employee/EmployeeManagement.vue'),
    }
]

export default routes
