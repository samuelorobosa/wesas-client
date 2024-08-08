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
import { useEffect, useState } from 'react';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';
import {
  addNGNViaPayStackThunk,
  getTransactionHistoryThunk,
} from '@/src/modules/wallet/net/walletThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import convertDateToISOString from '@/src/core/utils/convertDatetoISOString.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';

export default function CardPaymentTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    wallet: {
      get_transaction_history: {
        data: transactionHistory,
        loading: transactionHistoryLoading,
      },
    },
  } = useSelector((state) => state);
  const columns = [
    {
      accessorKey: 'id',
      header: () => (
        <div className="text-grey-08 font-bold">Transaction ID</div>
      ),
      cell: ({ row }) => row.getValue('id'),
    },
    {
      accessorKey: 'name',
      header: () => <div className="text-grey-08 font-bold">Payer</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: () => (
        <div className="text-grey-08 font-bold">Amount Credited</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('amount')}</div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className="text-grey-08 font-bold">Date</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('createdAt')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-grey-08 font-bold">Status</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08 capitalize">
          {row.getValue('status')}
        </div>
      ),
    },
  ];
  const new_table_data =
    transactionHistory &&
    transactionHistory.data &&
    transactionHistory.data.length > 0 &&
    transactionHistory.data.map((transaction) => ({
      id: transaction.id,
      name: transaction.name,
      amountReceived: `₦${formatNumberWithCommas(transaction.amountReceived)}`,
      amount: `£${formatNumberWithCommas(transaction.amount)}`,
      createdAt: convertDateToISOString(transaction.createdAt),
      rate: `£1 = ₦${transaction.exchangeRate}`,
      status: transaction.status,
    }));

  const formSchema = z.object({
    amount: z.string().nonempty('Amount is required'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
  });

  const removeQueryParams = (paramKeys) => {
    const newParams = new URLSearchParams(searchParams);
    paramKeys.forEach((key) => newParams.delete(key));
    setSearchParams(newParams);
  };

  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'successful') {
      toast.success('Payment successful', {
        closeButton: true,
      });
    }
    removeQueryParams(['type', 'payment']);
  }, []);

  async function onSubmit(values) {
    const __formData = {
      amount: Number(values.amount),
    };
    try {
      setIsLoading(true);
      const response = await dispatch(
        addNGNViaPayStackThunk(__formData),
      ).unwrap();
      setIsDialogOpen(false);
      window.open(response.data.checkoutUrl, '_self');
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  }
  const paginatedThunkCall = (page) => {
    dispatch(
      getTransactionHistoryThunk({
        channel: 'paystack',
        page,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      getTransactionHistoryThunk({
        channel: 'paystack',
      }),
    );
  }, []);

  return (
    <>
      <section className="mt-4 bg-white p-4 rounded-md">
        <div className="flex w-full justify-between items-center mb-6">
          <span className="font-bold text-base">Card Payment</span>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="ml-4 bg-blue hover:bg-primary-tint-300"
          >
            Add Funds
          </Button>
        </div>
        <DashboardTable
          columns={columns}
          data={new_table_data || []}
          isLoading={transactionHistoryLoading === LoadingStates.pending}
          pageInfo={transactionHistory?.pageInfo || {}}
          paginatedThunkCall={paginatedThunkCall}
        />
      </section>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="rounded-md">
          <header className="font-semibold text-base">Add Funds</header>
          <div className="grid w-full items-center gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field: { onChange, value, ref } }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Input
                              type="text"
                              value={`£${formatNumberWithCommas(value)}`}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(
                                  /[£,]/g,
                                  '',
                                );
                                onChange(rawValue);
                              }}
                              ref={ref}
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
                    disabled={isLoading || !form.formState.isValid}
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
    </>
  );
}
