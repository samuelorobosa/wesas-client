import { useState } from 'react';
import PendingRequests from '@/src/modules/logistics/components/PendingRequests.jsx';
import ProcessedRequests from '@/src/modules/logistics/components/ProcessedRequests.jsx';
import ShippedRequests from '@/src/modules/logistics/components/ShippedRequests.jsx';
import ConfirmedRequests from '@/src/modules/logistics/components/ConfirmedRequests.jsx';
import DeclinedRequests from '@/src/modules/logistics/components/DeclinedRequests.jsx';
import { RxHamburgerMenu } from 'react-icons/rx';
import useWindowSize from '@/src/core/utils/useWindowSize.js';
import { toggleCollapse } from '@/src/modules/dashboard/state/navDrawerSlice.js';
import { useDispatch } from 'react-redux';

export default function ShippingRequests() {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const handleNavDrawerToggle = () => {
    dispatch(toggleCollapse());
  };
  const tabs = [
    {
      key: 'pending',
      title: 'Pending',
      component: <PendingRequests />,
    },
    {
      key: 'processed',
      title: 'Processed',
      component: <ProcessedRequests />,
    },
    {
      key: 'confirmed',
      title: 'Confirmed',
      component: <ConfirmedRequests />,
    },
    {
      key: 'shipped',
      title: 'Shipped',
      component: <ShippedRequests />,
    },
    {
      key: 'declined',
      title: 'Declined',
      component: <DeclinedRequests />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <main className="w-full">
      <header className="flex items-center justify-between">
        <aside className="flex items-center gap-x-2">
          {width <= 768 ? (
            <RxHamburgerMenu
              className="cursor-pointer"
              onClick={handleNavDrawerToggle}
            />
          ) : null}
          <h1 className="font-medium text-xl">Shipping Requests</h1>
        </aside>
      </header>
      <ul className="flex items-center justify-start border-b border-b-grey_02 mt-4 overflow-auto">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === tab.key
                ? 'border-b-2 border-blue text-blue'
                : 'text-grey_03'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <section>{tabs.find((tab) => tab.key === activeTab).component}</section>
    </main>
  );
}
