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
import { useDispatch } from 'react-redux';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';
import {
  createSupplierThunk,
  getSuppliersThunk,
} from '@/src/modules/procurement/net/procurementThunks.js';
import { toast } from 'sonner';
import PendingPaySupplier from '@/src/modules/procurement/components/PendingPaySupplier.jsx';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { TabsList, TabsTrigger } from '@/src/core/components/ui/tabs.jsx';
import ProcessedPaySupplier from '@/src/modules/procurement/components/ProcessedPaySupplier.jsx';
import ReceivedPaySupplier from '@/src/modules/procurement/components/ReceivedPaySupplier.jsx';
import ShippedPaySupplier from '@/src/modules/procurement/components/ShippedPaySupplier.jsx';
import DeclinedPaySupplier from '@/src/modules/procurement/components/DeclinedPaySupplier.jsx';
import useWindowSize from '@/src/core/utils/useWindowSize.js';
import { toggleCollapse } from '@/src/modules/dashboard/state/navDrawerSlice.js';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function PaySupplier() {
  const { width } = useWindowSize();
  const handleNavDrawerToggle = () => {
    dispatch(toggleCollapse());
  };
  const [supplierToBeAdded, setSupplierToBePaid] = useState('ngn');
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const tabs = [
    {
      key: 'pending',
      title: 'Pending',
      component: <PendingPaySupplier />,
    },
    {
      key: 'processed',
      title: 'Processed',
      component: <ProcessedPaySupplier />,
    },
    {
      key: 'received',
      title: 'Received',
      component: <ReceivedPaySupplier />,
    },
    {
      key: 'shipped',
      title: 'Shipped',
      component: <ShippedPaySupplier />,
    },
    {
      key: 'declined',
      title: 'Declined',
      component: <DeclinedPaySupplier />,
    },
  ];
  const formSchema = z.object({
    content: z.string().nonempty('Content of Shipment is required'),
    amount: z.string().nonempty('Amount is required'),
    bankName: z.string().nonempty('Bank Name is required'),
    accountNo: z.string().nonempty('Account Number is required'),
    accountName: z.string().nonempty('Account Name is required'),
  });

  const formSchema2 = z.object({
    content: z.string().nonempty('Content of Shipment is required'),
    amount: z.string().nonempty('Amount is required'),
    bankName: z.string().nonempty('Bank Name is required'),
    accountNo: z.string().nonempty('Account Number is required'),
    accountName: z.string().nonempty('Account Name is required'),
    sortCode: z.string().nonempty('Sort Code is required'),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      amount: '',
      bankName: '',
      accountNo: '',
      accountName: '',
    },
    mode: 'onChange',
  });

  const form2 = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      content: '',
      amount: '',
      bankName: '',
      accountNo: '',
      accountName: '',
      sortCode: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getSuppliersThunk());
  }, []);

  async function onSubmit(formData) {
    const newFormData = {
      content: formData.content,
      amount: Number(formData.amount),
      bankDetails: {
        bankName: formData.bankName,
        accountNo: formData.accountNo,
        accountName: formData.accountName,
        currency: supplierToBeAdded.toUpperCase(),
      },
    };
    try {
      setIsCreating(true);
      await dispatch(createSupplierThunk(newFormData)).unwrap();
      form.reset();
      toast.success('Request created successfully');
      setIsDialogOpen(false);
      const queryParams = {
        status: 'pending',
      };
      dispatch(getSuppliersThunk(queryParams));
    } catch (e) {
      toast.error(e);
    } finally {
      setIsCreating(false);
    }
  }

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
          <h1 className="font-medium text-xl">Pay Suppliers</h1>
        </aside>
        <Dialog
          open={isDialogOpen}
          onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
        >
          <DialogTrigger asChild>
            <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
              Pay Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <header className="font-semibold text-base">Pay Supplier</header>
            <div className="grid w-full items-center gap-4">
              <Tabs
                defaultValue="ngn"
                onValueChange={(value) => setSupplierToBePaid(value)}
              >
                <TabsList className="w-full my-4">
                  <TabsTrigger className="w-full" value="ngn">
                    NGN
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="gbp">
                    GBP
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ngn">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="grid w-full items-center gap-4">
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Content"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field: { onChange, value, ref } }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    value={`£${formatNumberWithCommas(value)}`}
                                    type="text"
                                    placeholder="Amount"
                                    ref={ref}
                                    onChange={(e) => {
                                      const rawValue = e.target.value.replace(
                                        /[£,]/g,
                                        '',
                                      );
                                      onChange(rawValue);
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bankName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Bank Name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="accountNo"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Account Number"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="accountName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Account Name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isCreating || !form.formState.isValid}
                          className="w-full"
                        >
                          {isCreating ? (
                            <ClipLoader
                              color="#fff"
                              loading={true}
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
                </TabsContent>
                <TabsContent value="gbp">
                  <Form {...form2}>
                    <form onSubmit={form2.handleSubmit(onSubmit)}>
                      <div className="grid w-full items-center gap-4">
                        <FormField
                          control={form2.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Content"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="amount"
                          render={({ field: { onChange, value, ref } }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    value={`£${formatNumberWithCommas(value)}`}
                                    type="text"
                                    placeholder="Amount"
                                    ref={ref}
                                    onChange={(e) => {
                                      const rawValue = e.target.value.replace(
                                        /[£,]/g,
                                        '',
                                      );
                                      onChange(rawValue);
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="bankName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Bank Name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="accountNo"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Account Number"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="accountName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Account Name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form2.control}
                          name="sortCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Sort Code"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isCreating || !form2.formState.isValid}
                          className="w-full"
                        >
                          {isCreating ? (
                            <ClipLoader
                              color="#fff"
                              loading={true}
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
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
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
