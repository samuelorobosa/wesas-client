import logo from '../../../core/assets/images/logo.jpeg';
import { useMemo } from 'react';
import {
  BookUserIcon,
  DollarSign,
  LogOut,
  ShoppingCartIcon,
  TruckIcon,
  User,
} from 'lucide-react';
import { subRouteNames } from '@/src/core/navigation/routenames.js';
import NavDrawerItem from '@/src/modules/dashboard/components/NavDrawerItem.jsx';
import { secretKeys } from '@/src/core/utils/secretKeys.js';
import deleteFromLocalStorage from '@/src/core/utils/deleteFromLocalStorage.js';
import useWindowSize from '@/src/core/utils/useWindowSize.js';
import { Sheet, SheetContent } from '@/src/core/components/ui/sheet.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCollapse } from '@/src/modules/dashboard/state/navDrawerSlice.js';

export default function NavDrawer() {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state.navDrawer);
  const { width } = useWindowSize();
  const handleLogout = () => {
    deleteFromLocalStorage(secretKeys.USER_TOKEN);
    window.location.reload();
  };
  const sidebarMenu = useMemo(
    () => [
      {
        title: 'Profile',
        key: 0,
        icon: <User size={20} />,
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
        icon: <DollarSign size={20} />,
        links: [
          {
            title: 'Add Funds',
            path: subRouteNames.addFunds,
          },
          {
            title: 'Manage Subscription',
            path: subRouteNames.manageSubscription,
          },
          // {
          //   title: 'Transaction History',
          //   path: subRouteNames.transactionHistory,
          // },
        ],
      },
      {
        title: 'Procurement',
        key: 2,
        icon: <ShoppingCartIcon size={20} />,
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
        icon: <TruckIcon size={20} />,
        links: [
          // {
          //   title: 'Request Shipping',
          //   path: subRouteNames.requestShipping,
          // },
          {
            title: 'Express Courier Service',
            path: subRouteNames.requestExpressCourierService,
          },
          {
            title: 'Shipping Requests',
            path: subRouteNames.shippingRequests,
          },
        ],
      },
      {
        title: 'Support',
        key: 5,
        icon: <BookUserIcon size={20} />,
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
  if (width <= 768) {
    return (
      <Sheet open={isCollapsed} onOpenChange={() => dispatch(toggleCollapse())}>
        <SheetContent side="left" className="p-0 bg-sidebar text-white">
          <div className="flex items-center p-4 gap-x-2">
            <img className="w-6 h-6" src={logo} alt="We Shop And Ship Logo" />
            <p className="title">We Shop And Ship</p>
          </div>
          {sidebarMenu.map(({ title, key, icon, links }) => (
            <NavDrawerItem
              key={crypto.randomUUID()}
              title={title}
              icon={icon}
              links={links}
              itemKey={key}
            />
          ))}
          <div
            onClick={() => handleLogout()}
            className={`clickable flex items-center p-2 cursor-pointer`}
          >
            <span className="text-sidebarColor inline-block mr-2">
              <LogOut size={20} />
            </span>
            <p className="flex-1 text-sm">Logout</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav
      className={`h-full bg-sidebar text-white transition-all duration-300 ease-in-out w-[250px]`}
    >
      <div className="flex items-center p-4 gap-x-2">
        <img className="w-6 h-6" src={logo} alt="We Shop And Ship Logo" />
        <p className="title">We Shop And Ship</p>
      </div>
      {sidebarMenu.map(({ title, key, icon, links }) => (
        <NavDrawerItem
          key={crypto.randomUUID()}
          title={title}
          icon={icon}
          links={links}
          itemKey={key}
        />
      ))}
      <div
        onClick={() => handleLogout()}
        className={`clickable flex items-center p-2 cursor-pointer`}
      >
        <span className="text-sidebarColor inline-block mr-2">
          <LogOut size={20} />
        </span>
        <p className="flex-1 text-sm">Logout</p>
      </div>
    </nav>
  );
}
