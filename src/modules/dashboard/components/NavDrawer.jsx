import logo from '../../../core/assets/images/logo.jpeg';
import { useMemo } from 'react';
import {
  BookUserIcon,
  DollarSign,
  ShoppingCartIcon,
  TruckIcon,
  User,
} from 'lucide-react';
import { subRouteNames } from '@/src/core/navigation/routenames.js';

export default function NavDrawer() {
  const sidebarMenu = useMemo(
    () => [
      {
        title: 'Profile',
        key: 0,
        icon: <User />,
        links: [
          {
            title: 'User Profile',
            path: subRouteNames.profile,
          },
          {
            title: 'Event History',
            path: subRouteNames.eventHistory,
          },
        ],
      },
      {
        title: 'Wallet',
        key: 1,
        icon: <DollarSign />,
        links: [
          {
            title: 'Add Funds',
            path: subRouteNames.addFunds,
          },
          {
            title: 'Withdraw Funds',
            path: subRouteNames.withdrawFunds,
          },
          {
            title: 'Manage Subscription',
            path: subRouteNames.manageSubscription,
          },
          {
            title: 'Transaction History',
            path: subRouteNames.transactionHistory,
          },
        ],
      },
      {
        title: 'Procurement',
        key: 2,
        icon: <ShoppingCartIcon />,
        links: [
          {
            title: 'Orders',
            path: subRouteNames.orders,
          },
          {
            title: 'Pay Supplier',
            path: subRouteNames.paySupplier,
          },
        ],
      },
      {
        title: 'Logistics',
        key: 4,
        icon: <TruckIcon />,
        links: [
          {
            title: 'Shipping Address Book',
            path: subRouteNames.shippingAddresses,
          },
          {
            title: 'Request Shipping',
            path: subRouteNames.requestShipping,
          },
          {
            title: 'Express Courier Service',
            path: subRouteNames.requestExpressCourierService,
          },
        ],
      },
      {
        title: 'Support',
        key: 5,
        icon: <BookUserIcon />,
        links: [
          {
            title: 'Whatsapp',
            path: subRouteNames.createTicket,
          },
        ],
      },
    ],
    [],
  );
  return (
    <nav className="h-full p-2 border-r border-r-gray-300">
      <div className="flex items-center p-4">
        <img className="w-6 h-6" src={logo} alt="We Shop And Ship Logo" />
        <h3 className="title">WeShopAndShip</h3>
      </div>
    </nav>
  );
}
