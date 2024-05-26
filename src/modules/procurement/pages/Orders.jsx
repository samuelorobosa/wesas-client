import { useState } from 'react';
import ItemsInCart from '@/src/modules/procurement/components/ItemsInCart.jsx';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/core/components/ui/dialog.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PendingOrders from '@/src/modules/procurement/components/PendingOrders.jsx';
import ProcessedOrders from '@/src/modules/procurement/components/ProcessedOrders.jsx';
import ReceivedOrders from '@/src/modules/procurement/components/ReceivedOrders.jsx';
import ShippedOrders from '@/src/modules/procurement/components/ShippedOrders.jsx';

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const tabs = [
    {
      key: 'items-in-cart',
      title: 'Items in Cart',
      component: <ItemsInCart />,
    },
    {
      key: 'pending',
      title: 'Pending',
      component: <PendingOrders />,
    },
    {
      key: 'processing',
      title: 'Processing',
      component: <ProcessedOrders />,
    },
    {
      key: 'processed',
      title: 'Processed',
      component: <ProcessedOrders />,
    },
    {
      key: 'received',
      title: 'Received',
      component: <ReceivedOrders />,
    },
    {
      key: 'shipped',
      title: 'Shipped',
      component: <ShippedOrders />,
    },
  ];
  const formSchema = z.object({});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  async function onSubmit(formData) {
    // setIsLoading(true);
    console.log(formData);
  }
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <main className="w-full">
      <header className="flex items-center justify-between">
        <h1 className="font-medium text-xl">All Orders</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <header className="font-semibold text-base">Create Order</header>
            <div className="grid w-full items-center gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="product_link"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Product Link"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unit_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Unit Price"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Quantity"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="supplierId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Supplier ID"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <ClipLoader
                          color="#fff"
                          loading={isLoading}
                          size={15}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        <span>Create Order</span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
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
