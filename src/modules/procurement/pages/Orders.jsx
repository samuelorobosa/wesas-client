import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { createOrderThunk } from '@/src/modules/procurement/net/procurementThunks.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { toast } from 'sonner';
import DeclinedOrders from '@/src/modules/procurement/components/DeclinedOrders.jsx';

export default function Orders() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.procurement.create_order);
  const tabs = [
    {
      key: 'pending',
      title: 'Pending',
      component: <PendingOrders />,
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
    {
      key: 'declined',
      title: 'Declined',
      component: <DeclinedOrders />,
    },
  ];
  const formSchema = z.object({
    product: z.string().nonempty('Product Link is required'),
    unitPrice: z.string().nonempty('Unit Price is required'),
    quantity: z.string().nonempty('Quantity is required'),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: '',
      unitPrice: '',
      quantity: '',
      supplierId: '',
    },
    mode: 'onChange',
  });
  async function onSubmit(formData) {
    //Convert unitPrice and quantity to number
    formData.unitPrice = Number(formData.unitPrice);
    formData.quantity = Number(formData.quantity);
    dispatch(createOrderThunk(formData));
  }

  useEffect(() => {
    if (loading === LoadingStates.fulfilled) {
      toast.success('Order created successfully');
      form.reset();
      setIsDialogOpen(false);
    } else if (loading === LoadingStates.rejected) {
      toast.error('Failed to create order');
    }
  }, [loading]);

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <main className="w-full">
      <header className="flex items-center justify-between">
        <h1 className="font-medium text-xl">All Orders</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(_) => setIsDialogOpen(!isDialogOpen)}
        >
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
                      name="product"
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
                      name="unitPrice"
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
                      disabled={
                        loading === LoadingStates.pending ||
                        !form.formState.isValid
                      }
                      className="w-full"
                    >
                      {loading === LoadingStates.pending ? (
                        <ClipLoader
                          color="#fff"
                          loading={loading === LoadingStates.pending}
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
