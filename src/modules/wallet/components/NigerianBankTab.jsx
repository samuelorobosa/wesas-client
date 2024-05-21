import DashboardTable from '@/src/core/components/DataTable.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/core/components/ui/dialog.jsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/src/core/components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';

export default function NigerianBankTab() {
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      accessorKey: 'trxID',
      header: () => (
        <div className="text-grey-08 font-bold">Transaction ID</div>
      ),
      cell: ({ row }) => row.getValue('trxID'),
    },
    {
      accessorKey: 'payer',
      header: () => <div className="text-grey-08 font-bold">Payer</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('payer')}</div>
      ),
    },
    {
      accessorKey: 'amount_paid',
      header: () => <div className="text-grey-08 font-bold">Amount Paid</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('amount_paid')}
        </div>
      ),
    },
    {
      accessorKey: 'amount_credited',
      header: () => (
        <div className="text-grey-08 font-bold">Amount Credited</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('amount_credited')}
        </div>
      ),
    },
    {
      accessorKey: 'amount_paid_to',
      header: () => (
        <div className="text-grey-08 font-bold">Amount Paid To</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('amount_paid_to')}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => <div className="text-grey-08 font-bold">Date</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('date')}</div>
      ),
    },
    {
      accessorKey: 'rate',
      header: () => <div className="text-grey-08 font-bold">Rate</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('rate')}</div>
      ),
    },
    {
      accessorKey: 'update',
      header: () => <div className="text-grey-08 font-bold">Update</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('update')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-grey-08 font-bold">Status</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('status')}</div>
      ),
    },
  ];
  const new_table_data = [
    {
      trxID: crypto.randomUUID(),
      payer: 'John Doe',
      amount_paid: '₦1,000',
      amount_credited: '£1',
      amount_paid_to: 'John Doe',
      date: '2021-08-23',
      rate: '₦1 = £1',
      update: 'Update',
      status: 'Pending',
    },
    {
      trxID: crypto.randomUUID(),
      payer: 'John Doe',
      amount_paid: '₦1,000',
      amount_credited: '£1',
      amount_paid_to: 'John Doe',
      date: '2021-08-23',
      rate: '₦1 = £1',
      update: 'Update',
      status: 'Pending',
    },
    {
      trxID: crypto.randomUUID(),
      payer: 'John Doe',
      amount_paid: '₦1,000',
      amount_credited: '£1',
      amount_paid_to: 'John Doe',
      date: '2021-08-23',
      rate: '₦1 = £1',
      update: 'Update',
      status: 'Pending',
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
  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <div className="flex w-full justify-between items-center mb-6">
        <span className="font-bold text-base">Nigerian Bank (NGN and GBP)</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
              Add Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <header className="font-semibold text-base">Add Funds</header>
            <div className="grid w-full items-center gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="payername"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Payer's Name"
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
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Amount"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bank"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                  <SelectValue placeholder="Select a bank" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem
                                      key="zenith-bank"
                                      value="Zenith Bank"
                                    >
                                      Zenith Bank
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Date Paid"
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
                        <span>Make Payment</span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <DashboardTable columns={columns} data={new_table_data} />
    </section>
  );
}
