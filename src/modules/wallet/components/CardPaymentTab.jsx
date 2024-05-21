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
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';

export default function CardPaymentTab() {
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
      accessorKey: 'date',
      header: () => <div className="text-grey-08 font-bold">Date</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('date')}</div>
      ),
    },
    {
      accessorKey: 'rate',
      header: () => <div className="text-grey-08 font-bold">Exchange Rate</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('rate')}</div>
      ),
    },
    {
      accessorKey: 'action',
      header: () => <div className="text-grey-08 font-bold">Action</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('action')}</div>
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
      amount_paid: '₦1,000',
      amount_paid_to: 'John Doe',
      amount_credited: '£1',
      rate: '₦1 = £1',
      date: '2021-08-23',
      action: 'Update',
      status: 'Pending',
    },
    {
      trxID: crypto.randomUUID(),
      amount_paid: '₦1,000',
      amount_paid_to: 'John Doe',
      amount_credited: '£1',
      rate: '₦1 = £1',
      date: '2021-08-23',
      action: 'Update',
      status: 'Pending',
    },
    {
      trxID: crypto.randomUUID(),
      amount_paid: '₦1,000',
      amount_paid_to: 'John Doe',
      amount_credited: '£1',
      rate: '₦1 = £1',
      date: '2021-08-23',
      action: 'Update',
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
        <span className="font-bold text-base">UK Bank Transfer</span>
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
