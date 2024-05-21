import { createBrowserRouter, redirect } from 'react-router-dom';
import { routeNames, subRouteNames } from '@/src/core/navigation/routenames.js';
import RegistrationPage from '@/src/modules/auth/pages/RegistrationPage.jsx';
import LoginPage from '@/src/modules/auth/pages/LoginPage.jsx';
import DashboardPage from '@/src/modules/dashboard/pages/DashboardPage.jsx';
import ProfilePage from '@/src/modules/profile/pages/ProfilePage.jsx';
import EventHistoryPage from '@/src/modules/profile/pages/EventHistoryPage.jsx';
import AddFunds from '@/src/modules/wallet/pages/AddFunds.jsx';
import ManageSubscription from '@/src/modules/wallet/pages/ManageSubscription.jsx';
import TransactionHistory from '@/src/modules/wallet/pages/TransactionHistory.jsx';
import Orders from '@/src/modules/procurement/pages/Orders.jsx';

const appRouter = createBrowserRouter([
  {
    path: routeNames.home,
    loader: () => redirect(routeNames.register),
  },
  {
    path: routeNames.dashboard,
    element: <DashboardPage />,
    children: [
      {
        path: subRouteNames.profile,
        element: <ProfilePage />,
      },
      {
        path: subRouteNames.eventHistory,
        element: <EventHistoryPage />,
      },
      {
        path: subRouteNames.addFunds,
        element: <AddFunds />,
      },
      {
        path: subRouteNames.manageSubscription,
        element: <ManageSubscription />,
      },
      {
        path: subRouteNames.transactionHistory,
        element: <TransactionHistory />,
      },
      {
        path: subRouteNames.orders,
        element: <Orders />,
      },
    ],
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
