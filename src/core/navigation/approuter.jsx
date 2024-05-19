import { createBrowserRouter, redirect } from 'react-router-dom';
import { routeNames } from '@/src/core/navigation/routenames.js';
import RegistrationPage from '@/src/modules/auth/pages/RegistrationPage.jsx';
import LoginPage from '@/src/modules/auth/pages/LoginPage.jsx';
import DashboardPage from '@/src/modules/dashboard/pages/DashboardPage.jsx';

const appRouter = createBrowserRouter([
  {
    path: routeNames.home,
    loader: () => redirect(routeNames.register),
  },
  {
    path: routeNames.dashboard,
    element: <DashboardPage />,
    children: [],
  },
  {
    path: routeNames.register,
    element: <RegistrationPage />,
  },
  {
    path: routeNames.login,
    element: <LoginPage />,
  },
]);

export default appRouter;
