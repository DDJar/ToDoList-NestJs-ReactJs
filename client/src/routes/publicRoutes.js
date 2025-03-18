import { DashboardLayout } from '~/layout';
import CommonDashboard from '~/page/Dashboard/CommonDashboard';
import Task from '~/page/Dashboard/Task/Task';
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
    {
        path: '/dashboards/task/view',
        component: Task,
        layout: DashboardLayout,
    },
];
export default publicRoutes;
