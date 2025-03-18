import { DashboardLayout } from '~/layout';
import CommonDashboard from '~/page/Dashboard/CommonDashboard';
import CreateUser from '~/page/Dashboard/User/CreateUser';
import UserPage from '~/page/Dashboard/User/User';

const publicRoutes = [
    {
        path: '/',
        component: CommonDashboard,
        layout: DashboardLayout,
    },
    {
        path: '/dashboards',
        component: CommonDashboard,
        layout: DashboardLayout,
    },
    {
        path: '/dashboards/users/view-list',
        component: UserPage,
        layout: DashboardLayout,
    },

    {
        path: '/dashboards/users/create',
        component: CreateUser,
        layout: DashboardLayout,
    },
];
export default publicRoutes;
