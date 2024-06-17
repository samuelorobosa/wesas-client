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
import { Badge } from '@/src/core/components/ui/badge.jsx';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/core/components/ui/popover.jsx';
import { cn } from '@/src/core/lib/cn/cn.js';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/src/core/components/ui/calendar.jsx';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFundsThunk,
  addGBPViaCardThunk,
  getTransactionHistoryThunk,
} from '@/src/modules/wallet/net/walletThunks.js';
import { useEffect } from 'react';
import { toast } from 'sonner';
import convertDateToISOString from '@/src/core/utils/convertDatetoISOString.js';
import { useSearchParams } from 'react-router-dom';

export default function UKBankTransferTab() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {
    wallet: {
      add_funds: { loading },
      add_gbp_via_card: { loading: loading2 },
      get_transaction_history: { data: transactionHistory },
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
    // {
    //   accessorKey: 'action',
    //   header: () => <div className="text-grey-08 font-bold">Action</div>,
    //   cell: ({ row }) => (
    //     <div className="font-normal text-grey-08">{row.getValue('action')}</div>
    //   ),
    // },
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
      createdAt: convertDateToISOString(transaction.createdAt),
      rate: `£1 = ₦${transaction.exchangeRate}`,
      // update: 'Update',
      status: transaction.status,
    }));

  const bankOptions = [
    {
      id: 1,
      label: 'Zenith Bank',
      value: 'Zenith Bank',
      accountNo: '1017482085',
    },
  ];

  const formSchema = z.object({
    payerName: z.string().nonempty('Payer name is required'),
    amount: z.string().nonempty('Amount is required'),
    bankName: z.string().nonempty('Bank is required'),
    paymentDate: z.date({ required_error: 'Payment date is required' }),
  });
  const formSchema2 = z.object({
    amount: z.string().nonempty('Amount is required'),
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

  const form2 = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
  });

  const checkAccountNumber = (bank) => {
    switch (bank) {
      case '1':
        return '1017482085';
      default:
        return '057';
    }
  };

  async function onSubmit(values) {
    const __formData = {
      amount: Number(values.amount),
      recipientAccount: {
        bankName: bankOptions.find(
          (option) => option.id === Number(values.bankName),
        ).value,
        accountNo: checkAccountNumber(values.bankName),
      },
      currency: 'GBP',
      payerName: values.payerName,
      paymentDate: values.paymentDate,
    };
    dispatch(addFundsThunk(__formData));
  }

  async function onSubmit2(values) {
    const __formData = {
      amount: Number(values.amount),
    };
    dispatch(addGBPViaCardThunk(__formData));
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
          currency: 'GBP',
        }),
      );
    } else if (loading === LoadingStates.rejected) {
      toast.error('Failed to add funds');
    }
  }, [loading]);

  useEffect(() => {
    dispatch(
      getTransactionHistoryThunk({
        currency: 'GBP',
      }),
    );
  }, []);

  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'successful') {
      toast.success('Payment successful', {
        closeButton: true,
      });
    }
  }, []);

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <div className="flex w-full justify-between items-center mb-6">
        <span className="font-bold text-base">UK Bank Transfer</span>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
                Pay via Card
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
              <header className="font-semibold text-base">
                Add Funds via Card
              </header>
              <div className="grid w-full items-center gap-4">
                <Form {...form2}>
                  <form onSubmit={form2.handleSubmit(onSubmit2)}>
                    <div className="grid w-full items-center gap-4">
                      <FormField
                        control={form2.control}
                        name="amount"
                        render={({ field: { onChange, value, ref } }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  type="text"
                                  value={formatNumberWithCommas(value)}
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(
                                      /,/g,
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
                        disabled={
                          loading2 === LoadingStates.pending ||
                          !form2.formState.isValid
                        }
                        className="w-full"
                      >
                        {loading2 === LoadingStates.pending ? (
                          <ClipLoader
                            color="#fff"
                            loading={loading2 === LoadingStates.pending}
                            size={15}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <span>Proceed</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          {/**/}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
                Add Funds via Bank
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
              <header className="font-semibold text-base">
                Add Funds via Bank
              </header>
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
                                  value={formatNumberWithCommas(value)}
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(
                                      /,/g,
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
                                      (option) =>
                                        option.id === Number(field.value),
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
                            loading={loading === LoadingStates.pending}
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
        </div>
      </div>
      <DashboardTable columns={columns} data={new_table_data} />
    </section>
  );
}
