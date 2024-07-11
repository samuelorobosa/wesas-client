import { useState } from 'react';
import PendingRequests from '@/src/modules/logistics/components/PendingRequests.jsx';
import ProcessedRequests from '@/src/modules/logistics/components/ProcessedRequests.jsx';
import ShippedRequests from '@/src/modules/logistics/components/ShippedRequests.jsx';

export default function ShippingRequests() {
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
      key: 'shipped',
      title: 'Shipped',
      component: <ShippedRequests />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <main className="w-full">
      <header className="flex items-center justify-between">
        <h1 className="font-medium text-xl">Shipping Requests</h1>
      </header>
      <ul className="flex items-center justify-start border-b border-b-grey_02 mt-4">
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
