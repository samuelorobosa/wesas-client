import DashboardTable from '@/src/core/components/DataTable.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { Dialog, DialogContent } from '@/src/core/components/ui/dialog.jsx';
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
import { Calendar } from '@/src/core/components/ui/calendar.jsx';
import { ClipLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/core/components/ui/popover.jsx';
import { cn } from '@/src/core/lib/cn/cn.js';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFundsThunk,
  getBanksThunk,
  getTransactionHistoryThunk,
} from '@/src/modules/wallet/net/walletThunks.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { toast } from 'sonner';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';
import { getExchangeRatesThunk } from '@/src/modules/profile/net/profileThunks.js';
import { Badge } from '@/src/core/components/ui/badge.jsx';
import convertDateToISOString from '@/src/core/utils/convertDatetoISOString.js';
import { resetAddFundsLoadingState } from '@/src/modules/wallet/state/walletSlice.js';

export default function NigerianBankTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    banks: { data: banks, loading: getBanksLoading },
  } = useSelector((state) => state.wallet);
  const [exchangeRate, setExchangeRate] = useState(0);
  const {
    wallet: {
      add_funds: { loading },
      get_transaction_history: {
        data: transactionHistory,
        loading: transactionHistoryLoading,
      },
    },
    profile: {
      get_exchange_rates: {
        data: exchangeRates,
        loading: exchangeRatesLoading,
      },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
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
      accessorKey: 'amountReceived',
      header: () => <div className="text-grey-08 font-bold">Amount Paid</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('amountReceived')}
        </div>
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
      accessorKey: 'createdAt',
      header: () => <div className="text-grey-08 font-bold">Date</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('createdAt')}
        </div>
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
    transactionHistory.length > 0 &&
    transactionHistory.map((transaction) => ({
      id: transaction.id,
      name: transaction.name,
      amountReceived: `₦${formatNumberWithCommas(transaction.amountReceived)}`,
      amount: `£${formatNumberWithCommas(transaction.amount)}`,
      amount_paid_to: (
        <section className="flex flex-col gap-y-1">
          <span>{transaction?.recipientAccount?.accountNo}</span>
          <span>{transaction?.recipientAccount?.bankName}</span>
        </section>
      ),
      createdAt: convertDateToISOString(transaction.createdAt),
      rate: `£1 = ₦${transaction.exchangeRate}`,
      status: transaction.status,
    }));

  const formSchema = z.object({
    payerName: z.string().nonempty('Payer name is required'),
    amount: z.string().nonempty('Amount is required'),
    bankName: z.string().nonempty('Bank is required'),
    paymentDate: z.date({ required_error: 'Payment date is required' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payerName: '',
      amount: '',
      bankName: '',
      paymentDate: '',
    },
    mode: 'onChange',
  });

  const bankOptions =
    banks &&
    banks
      .filter((account) => account.currency === 'NGN')
      .map((bank) => ({
        id: bank.id,
        label: bank.bankName,
        value: bank.bankName,
        accountNo: bank.accountNo,
        accountName: bank.accountName,
      }));

  console.log(bankOptions);
  console.log(banks);

  useEffect(() => {
    dispatch(getBanksThunk());
  }, []);

  async function onSubmit(values) {
    const __formData = {
      amount: Number(values.amount),
      recipientAccount: {
        bankName: bankOptions.find(
          (option) => option.id === Number(values.bankName),
        ).value,
        accountNo: bankOptions.find(
          (option) => option.id === Number(values.bankName),
        ).accountNo,
      },
      currency: 'NGN',
      payerName: values.payerName,
      paymentDate: values.paymentDate,
    };
    dispatch(addFundsThunk(__formData));
  }

  useEffect(() => {
    if (loading === LoadingStates.fulfilled) {
      toast.success(
        <div className="flex flex-col gap-y-1">
          <span className="text-sm">Entry Added</span>
          <span className="text-xs">Await Admin Approval</span>
        </div>,
        {
          closeButton: true,
        },
      );
      dispatch(
        getTransactionHistoryThunk({
          currency: 'NGN',
        }),
      );
      setIsDialogOpen(false);
      form.reset();
      dispatch(resetAddFundsLoadingState());
    } else if (loading === LoadingStates.rejected) {
      toast.error('Failed to add funds');
      dispatch(resetAddFundsLoadingState());
    }
  }, [loading]);

  function getExchangeRate() {
    dispatch(getExchangeRatesThunk());
  }

  useEffect(() => {
    if (exchangeRatesLoading === LoadingStates.fulfilled) {
      setExchangeRate(exchangeRates.data[0]?.naira);
    }
  }, [exchangeRatesLoading]);

  useEffect(() => {
    dispatch(
      getTransactionHistoryThunk({
        currency: 'NGN',
      }),
    );
  }, []);

  const openDialog = () => {
    getExchangeRate();
    setIsDialogOpen(true);
  };

  return (
    <>
      <section className="mt-4 bg-white p-4 rounded-md">
        <div className="flex w-full justify-between items-center mb-6">
          <span className="font-bold text-base">Nigerian Bank</span>
          <Button
            onClick={() => openDialog()}
            className="ml-4 bg-blue hover:bg-primary-tint-300"
          >
            Add Funds
          </Button>
        </div>
        {transactionHistory && (
          <DashboardTable
            columns={columns}
            data={new_table_data}
            isLoading={transactionHistoryLoading === LoadingStates.pending}
          />
        )}
      </section>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-md">
          <header className="font-semibold text-base">Add Funds</header>
          <Badge
            variant="default"
            className="mt-2 py-1 justify-center flex-col gap-y-2"
          >
            {form.getValues('bankName') ? (
              <section className="flex gap-y-2 flex-col items-center">
                <span>Pay into the following bank and submit:</span>
                <div>
                  {
                    bankOptions.find(
                      (option) =>
                        option.id === Number(form.getValues('bankName')),
                    )?.label
                  }
                  &nbsp; - &nbsp;
                  {
                    bankOptions.find(
                      (option) =>
                        option.id === Number(form.getValues('bankName')),
                    )?.accountNo
                  }
                </div>
              </section>
            ) : (
              <span>No Bank Selected</span>
            )}
          </Badge>
          <div className="grid w-full items-center gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <FormField
                    control={form.control}
                    name="payerName"
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
                                getExchangeRate();
                              }}
                              ref={ref}
                              placeholder="Amount"
                            />
                            <div className="text-muted-foreground text-xs">
                              {value &&
                                `£${value} = ₦${formatNumberWithCommas(exchangeRate * value)}`}
                            </div>
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
                            <Select
                              value={
                                bankOptions.find(
                                  (option) => option.id === Number(field.value),
                                )?.id
                              }
                              onValueChange={(e) => {
                                field.onChange(e);
                              }}
                            >
                              <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <SelectValue placeholder="Mode of payment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {bankOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.id}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
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
                    name="paymentDate"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal rounded',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Date of Payment </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              captionLayout="dropdown-buttons"
                              fromDate={new Date(1990, 0)}
                              classNames={{
                                caption_label: 'text-base font-bold hidden',
                                caption_dropdowns: 'flex gap-1',
                              }}
                              toDate={new Date()}
                            />
                          </PopoverContent>
                        </Popover>
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
                        loading={true}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <span>I have paid</span>
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
