import { useEffect, useState } from 'react';
import NigerianBankTab from '@/src/modules/wallet/components/NigerianBankTab.jsx';
import UKBankTransferTab from '@/src/modules/wallet/components/UKBankTransferTab.jsx';
import CardPaymentTab from '@/src/modules/wallet/components/CardPaymentTab.jsx';
import { useSearchParams } from 'react-router-dom';

export default function AddFunds() {
  const [searchParams] = useSearchParams();
  const tabs = [
    {
      key: 'ngn-bank-transfer',
      title: 'Nigerian Bank',
      element: <NigerianBankTab />,
    },
    {
      key: 'uk-bank-transfer',
      title: 'UK Bank Transfer/Card Payment (GBP)',
      element: <UKBankTransferTab />,
    },
    {
      key: 'card-payment',
      title: 'Card Payment for Rest of the world (NGN)',
      element: <CardPaymentTab />,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type && type === 'uk-card-payment') {
      setActiveTab('uk-bank-transfer');
    }
  }, []);

  return (
    <main className="w-full">
      <h1 className="font-medium text-xl">Add Funds</h1>
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
      <section>{tabs.find((tab) => tab.key === activeTab).element}</section>
    </main>
  );
}
