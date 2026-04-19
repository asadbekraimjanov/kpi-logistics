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
    }
]

export default routes
