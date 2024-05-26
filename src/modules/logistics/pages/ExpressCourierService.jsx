import { useState } from 'react';
import ShippersDetails from '@/src/modules/logistics/components/ShippersDetails.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { ClipLoader } from 'react-spinners';
import ReceiversDetails from '@/src/modules/logistics/components/ReceiversDetails.jsx';
import GoodsDetails from '@/src/modules/logistics/components/GoodsDetails.jsx';

export default function ExpressCourierService() {
  const formTabs = [
    {
      key: 'shipper-details',
      title: 'Shipper Details',
      component: <ShippersDetails />,
    },
    {
      key: 'receiver-details',
      title: 'Receiver Details',
      component: <ReceiversDetails />,
    },
    {
      key: 'goods-details',
      title: 'Goods Details',
      component: <GoodsDetails />,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(formTabs[0].key);
  return (
    <main className="w-full">
      <h1 className="font-medium text-xl">Request Express Courier Services</h1>
      <section className="rounded-md bg-white p-4 mt-4">
        <div className="flex gap-x-3">
          <aside className="flex flex-col gap-y-3 w-64">
            {formTabs.map((tab) => (
              <div
                onClick={() => setActiveTab(tab.key)}
                key={tab.key}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1 rounded h-4 bg-blue ${activeTab === tab.key ? 'visible' : 'invisible'}`}
                  ></div>
                  <p
                    className={`cursor-pointer ${activeTab === tab.key ? 'text-black' : 'text-grey_03'}`}
                  >
                    {tab.title}
                  </p>
                </div>
              </div>
            ))}
          </aside>
          <aside className="w-full">
            {formTabs.find((tab) => tab.key === activeTab).component}

            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={isLoading} className="self-start">
                {isLoading ? (
                  <ClipLoader
                    color="#fff"
                    loading={isLoading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <span>Request Service</span>
                )}
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
