import { useState } from 'react';
import { Button } from '@/src/core/components/ui/button.jsx';
import ReceiversDetails from '@/src/modules/logistics/components/ReceiversDetails.jsx';
import ShipmentDetails from '@/src/modules/logistics/components/ShipmentDetails.jsx';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/core/components/ui/dialog.jsx';
import ShippersDetails from '@/src/modules/logistics/components/ShippersDetails.jsx';
import PendingCouriers from '@/src/modules/logistics/components/PendingCouriers.jsx';
import ProcessedCouriers from '@/src/modules/logistics/components/ProcessedCouriers.jsx';
import ConfirmedCouriers from '@/src/modules/logistics/components/ConfirmedCouriers.jsx';
import ShippedCouriers from '@/src/modules/logistics/components/ShippedCouriers.jsx';
import DeclinedCouriers from '@/src/modules/logistics/components/DeclinedCouriers.jsx';
import useWindowSize from '@/src/core/utils/useWindowSize.js';
import { toggleCollapse } from '@/src/modules/dashboard/state/navDrawerSlice.js';
import { useDispatch } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function ExpressCourierService() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const formTabs = [
    {
      key: 'sender-details',
      title: "Sender's Details",
      component: (
        <ShippersDetails
          formData={formData}
          setFormData={setFormData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ),
    },
    {
      key: 'receiver-details',
      title: "Receiver's Details",
      component: (
        <ReceiversDetails
          formData={formData}
          setFormData={setFormData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ),
    },
    {
      key: 'goods-details',
      title: 'Goods Details',
      component: (
        <ShipmentDetails
          formData={formData}
          setFormData={setFormData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsDialogOpen={setIsDialogOpen}
        />
      ),
    },
  ];
  const tables = [
    {
      key: 'pending',
      title: 'Pending',
      component: <PendingCouriers />,
    },
    {
      key: 'processed',
      title: 'Processed',
      component: <ProcessedCouriers />,
    },
    {
      key: 'confirmed',
      title: 'Confirmed',
      component: <ConfirmedCouriers />,
    },
    {
      key: 'shipped',
      title: 'Shipped',
      component: <ShippedCouriers />,
    },
    {
      key: 'declined',
      title: 'Declined',
      component: <DeclinedCouriers />,
    },
  ];
  const [activeTable, setActiveTable] = useState(tables[0].key);
  const { width } = useWindowSize();
  const handleNavDrawerToggle = () => {
    dispatch(toggleCollapse());
  };
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
          <h1 className="font-medium text-lg whitespace-nowrap">
            Express Courier Service
          </h1>
        </aside>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
              Request Service
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md max-w-[800px]">
            <header className="font-semibold text-base">
              Request Express Courier Services
            </header>
            <section className="rounded-md bg-white">
              <div className="flex gap-x-3">
                <aside className="flex flex-col gap-y-3 w-64">
                  {formTabs.map((tab, index) => (
                    <div
                      // onClick={() => setActiveTab(index)}
                      key={tab.key}
                      className="flex items-center gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1 rounded h-4 bg-blue ${activeTab === index ? 'visible' : 'invisible'}`}
                        ></div>
                        <p
                          className={`cursor-pointer ${activeTab === index ? 'text-black' : 'text-grey_03'}`}
                        >
                          {tab.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </aside>
                <aside className="w-full">
                  <section>
                    {formTabs.map((tab, index) => (
                      <section
                        key={tab.key}
                        className={activeTab === index ? 'block' : 'hidden'}
                      >
                        {tab.component}
                      </section>
                    ))}
                  </section>
                </aside>
              </div>
            </section>
          </DialogContent>
        </Dialog>
      </header>
      <ul className="flex items-center justify-start border-b border-b-grey_02 mt-4 overflow-auto">
        {tables.map((table) => (
          <li
            key={table.key}
            className={`cursor-pointer px-4 py-2 ${
              activeTable === table.key
                ? 'border-b-2 border-blue text-blue'
                : 'text-grey_03'
            }`}
            onClick={() => setActiveTable(table.key)}
          >
            {table.title}
          </li>
        ))}
      </ul>
      <section>
        {tables.find((table) => table.key === activeTable).component}
      </section>
    </main>
  );
}
