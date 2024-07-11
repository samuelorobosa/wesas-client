import { createBrowserRouter, redirect } from 'react-router-dom';
import { routeNames, subRouteNames } from '@/src/core/navigation/routenames.js';
import RegistrationPage from '@/src/modules/auth/pages/RegistrationPage.jsx';
import LoginPage from '@/src/modules/auth/pages/LoginPage.jsx';
import DashboardPage from '@/src/modules/dashboard/pages/DashboardPage.jsx';
import ProfilePage from '@/src/modules/profile/pages/ProfilePage.jsx';
import EventHistoryPage from '@/src/modules/profile/pages/EventHistoryPage.jsx';
import AddFunds from '@/src/modules/wallet/pages/AddFunds.jsx';
import ManageSubscription from '@/src/modules/wallet/pages/ManageSubscription.jsx';
import Orders from '@/src/modules/procurement/pages/Orders.jsx';
import Suppliers from '@/src/modules/procurement/pages/Suppliers.jsx';
import ExpressCourierService from '@/src/modules/logistics/pages/ExpressCourierService.jsx';
import ShippingRequests from '@/src/modules/logistics/pages/ShippingRequests.jsx';
import ShipmentOrders from '@/src/modules/logistics/pages/ShipmentOrders.jsx';

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
        path: subRouteNames.shippingRequests,
        element: <ShippingRequests />,
      },
      {
        path: `${subRouteNames.shippingRequests}/${subRouteNames.shipmentOrders}/:orderId`,
        element: <ShipmentOrders />,
      },
      // {
      //   path: subRouteNames.transactionHistory,
      //   element: <TransactionHistory />,
      // },
      {
        path: subRouteNames.orders,
        element: <Orders />,
      },
      {
        path: subRouteNames.suppliers,
        element: <Suppliers />,
      },
      // {
      //   path: subRouteNames.requestShipping,
      //   element: <RequestShipping />,
      // },
      {
        path: subRouteNames.requestExpressCourierService,
        element: <ExpressCourierService />,
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
