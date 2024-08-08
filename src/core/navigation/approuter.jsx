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
import ExpressCourierService from '@/src/modules/logistics/pages/ExpressCourierService.jsx';
import ShippingRequests from '@/src/modules/logistics/pages/ShippingRequests.jsx';
import ShipmentOrders from '@/src/modules/logistics/pages/ShipmentOrders.jsx';
import ForgotPassword from '@/src/modules/auth/pages/ForgotPassword.jsx';
import Error404 from '@/src/core/components/Error404.jsx';
import PaySupplier from '@/src/modules/procurement/pages/PaySupplier.jsx';
import TermsAndPrivacyPolicy from '@/src/modules/auth/pages/TermsandPrivacyPolicy.jsx';
import CustomErrorBoundary from '@/src/core/components/ErrorBoundary.jsx';

const appRouter = createBrowserRouter([
  {
    path: routeNames.home,
    loader: () => redirect(routeNames.register),
  },
  {
    path: routeNames.dashboard,
    element: <DashboardPage />,
    errorElement: <CustomErrorBoundary />,
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
      {
        path: subRouteNames.orders,
        element: <Orders />,
      },
      {
        path: subRouteNames.requestExpressCourierService,
        element: <ExpressCourierService />,
      },
      {
        path: subRouteNames.paySupplier,
        element: <PaySupplier />,
      },
    ],
  },
  {
    path: routeNames.register,
    element: <RegistrationPage />,
    errorElement: <CustomErrorBoundary />,
  },
  {
    path: routeNames.login,
    element: <LoginPage />,
    errorElement: <CustomErrorBoundary />,
  },
  {
    path: routeNames.forgotPassword,
    element: <ForgotPassword />,
    errorElement: <CustomErrorBoundary />,
  },
  {
    path: routeNames.termsAndConditions,
    element: <TermsAndPrivacyPolicy />,
    errorElement: <CustomErrorBoundary />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);

export default appRouter;
