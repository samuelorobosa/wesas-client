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
import {
  createSupplierThunk,
  getSuppliersThunk,
} from '@/src/modules/procurement/net/procurementThunks.js';
import SuppliersTable from '@/src/modules/procurement/components/SuppliersTable.jsx';
import { toast } from 'sonner';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/src/core/components/ui/tabs.jsx';
import { TabsContent } from '@radix-ui/react-tabs';

export default function Suppliers() {
  const [supplierToBeAdded, setSupplierToBeAdded] = useState('ngn');
  const [isDialog, setIsDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();
  const formSchema = z.object({
    name: z.string().nonempty('Name is required'),
    accountName: z.string().nonempty('Account Name is required'),
    phoneNumber: z.string().nonempty('Phone Number is required'),
    bankName: z.string().nonempty('Bank Name is required'),
    accountNo: z.string().nonempty('Account Number is required'),
  });
  const formSchema2 = z.object({
    name: z.string().nonempty('Name is required'),
    accountName: z.string().nonempty('Account Name is required'),
    phoneNumber: z.string().nonempty('Phone Number is required'),
    bankName: z.string().nonempty('Bank Name is required'),
    accountNo: z.string().nonempty('Account Number is required'),
    sortCode: z.string().nonempty('Sort Code is required'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      bankName: '',
      accountNo: '',
      accountName: '',
    },
    mode: 'onChange',
  });
  const form2 = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      name: '',
      phoneNumber: '',
      bankName: '',
      accountNo: '',
      sortCode: '',
      accountName: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(formData) {
    const __formData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      bankDetails: {
        bankName: formData.bankName,
        accountNo: formData.accountNo,
        accountName: formData.accountName,
        currency: supplierToBeAdded.toUpperCase(),
        ...(supplierToBeAdded === 'gbp' && { sortCode: formData.sortCode }),
      },
    };
    try {
      setIsCreating(true);
      await dispatch(createSupplierThunk(__formData)).unwrap();
      form.reset();
      setIsDialog(false);
      dispatch(getSuppliersThunk());
      toast.success('Supplier created successfully');
    } catch (e) {
      toast.error(e);
    } finally {
      setIsCreating(false);
    }
  }
  return (
    <main className="w-full">
      <header className="flex items-center justify-between">
        <h1 className="font-medium text-xl">All Suppliers</h1>
        <Dialog open={isDialog} onOpenChange={setIsDialog}>
          <DialogTrigger asChild>
            <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
              Create Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <header className="font-semibold text-base">Create Supplier</header>
            <div className="grid w-full items-center gap-4">
              <Tabs
                defaultValue="ngn"
                onValueChange={(value) => setSupplierToBeAdded(value)}
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
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Phone Number"
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
                            <span>Create Supplier</span>
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
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex flex-col space-y-1.5">
                                  <Input
                                    type="text"
                                    {...field}
                                    placeholder="Phone Number"
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
                            <span>Create Supplier</span>
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
      <section className="mt-4">
        <SuppliersTable />
      </section>
    </main>
  );
}
