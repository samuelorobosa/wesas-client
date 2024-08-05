import { CircleAlert } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/core/components/ui/dialog.jsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/src/core/components/ui/button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPastSubscriptionsThunk,
  getPlansThunk,
  subscribeToAPlanThunk,
} from '@/src/modules/wallet/net/walletThunks.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { useEffect } from 'react';
import { toast } from 'sonner';
import convertDateToISOString from '@/src/core/utils/convertDatetoISOString.js';
import { RxHamburgerMenu } from 'react-icons/rx';
import useWindowSize from '@/src/core/utils/useWindowSize.js';
import { toggleCollapse } from '@/src/modules/dashboard/state/navDrawerSlice.js';

export default function ManageSubscription() {
  const { width } = useWindowSize();
  const {
    get_plans: { data, loading },
    subscribe: { loading: subscribeLoading },
    get_past_subscriptions: { data: pastSubscriptions },
  } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const formSchema = z.object({
    subscription: z.string().nonempty(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscription: '',
    },
    mode: 'onChange',
  });
  const handleGetPlans = () => {
    dispatch(getPlansThunk());
  };

  async function onSubmit(values) {
    const subscriptionID = data.find(
      (item) => item.name === values.subscription,
    )?.id;
    dispatch(subscribeToAPlanThunk(subscriptionID));
  }

  useEffect(() => {
    if (subscribeLoading === LoadingStates.fulfilled) {
      toast.success('Subscription successful');
    }
  }, [subscribeLoading]);

  useEffect(() => {
    dispatch(getPastSubscriptionsThunk());
  }, []);

  const handleNavDrawerToggle = () => {
    dispatch(toggleCollapse());
  };

  return (
    <main className="w-full">
      <aside className="flex items-center gap-x-2">
        {width <= 768 ? (
          <RxHamburgerMenu
            className="cursor-pointer"
            onClick={handleNavDrawerToggle}
          />
        ) : null}
        <h1 className="font-medium text-xl">Manage Subscription</h1>
      </aside>
      <section>
        <p className="mt-3">
          You can manage your subscription here. Please contact support if you
          have any issues.
        </p>
        {pastSubscriptions.length > 0 ? (
          <div className="bg-white w-1/2 mt-4 rounded-md flex flex-col">
            <div className="flex flex-col gap-y-3 justify-center items-center rounded-t-md">
              <p className="text-lg self-start bg-slate-100 w-full text-black p-2 rounded-t-md">
                Current Subscription
              </p>
              <div className="flex flex-col gap-y-2 my-1 self-start px-2 py-0">
                <span className="text-2xl font-bold">
                  {pastSubscriptions[0].name}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 my-1 self-start px-2 py-0">
                <ul className="flex flex-col gap-y-2">
                  <li>
                    Valid until{' '}
                    {convertDateToISOString(pastSubscriptions[0].endDate)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white w-full mt-4 rounded-md h-96 flex flex-col justify-center ">
            <figure className="flex flex-col gap-y-3 justify-center items-center">
              <CircleAlert color="#8B909A" size={100} />
              <p className="text-sm text-grey_03">
                You have no active subscription.
              </p>
              <Dialog
                onOpenChange={(open) => {
                  if (open) {
                    handleGetPlans();
                  }
                }}
              >
                <DialogTrigger>
                  <p className="cursor-pointer text-blue text-sm">
                    Get Started
                  </p>
                </DialogTrigger>
                <DialogContent className="rounded-md">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <header className="font-semibold text-base text-center">
                        Subscribe
                      </header>
                      <FormField
                        control={form.control}
                        name="subscription"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col gap-y-2">
                                <span className="font-medium text-sm text-grey_03">
                                  Plan Type
                                </span>
                                <Select
                                  onValueChange={(e) => {
                                    field.onChange(e);
                                  }}
                                >
                                  <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <SelectValue placeholder="Select a plan" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {loading === LoadingStates.fulfilled ? (
                                        data.map((item) => (
                                          <SelectItem
                                            key={item.id}
                                            value={item.name}
                                          >
                                            {item.name}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <ClipLoader
                                          color="#000"
                                          loading={loading}
                                          size={15}
                                          aria-label="Loading Spinner"
                                          data-testid="loader"
                                        />
                                      )}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage className="text-left" />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col gap-y-2 my-3">
                        <p className="font-medium text-xs text-grey_03 self-center">
                          Plan Summary
                        </p>
                        <section className="flex flex-col gap-y-1 text-xs">
                          <p className="flex justify-between">
                            <span>Name:</span>
                            <span>
                              {form.getValues('subscription') ||
                                'Plan not selected'}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span>Duration:</span>
                            <span>
                              {data.find(
                                (item) =>
                                  item.name === form.getValues('subscription'),
                              )?.duration
                                ? `${data.find((item) => item.name === form.getValues('subscription'))?.duration} months`
                                : 'Plan not selected'}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span>Amount:</span>
                            <span>
                              {data.find(
                                (item) =>
                                  item.name === form.getValues('subscription'),
                              )?.duration
                                ? `${data.find((item) => item.name === form.getValues('subscription'))?.amount} months`
                                : 'Plan not selected'}
                            </span>
                          </p>
                        </section>
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          subscribeLoading === LoadingStates.pending ||
                          !form.formState.isValid
                        }
                        className="w-full"
                      >
                        {subscribeLoading === LoadingStates.pending ? (
                          <ClipLoader
                            color="#fff"
                            loading={subscribeLoading === LoadingStates.pending}
                            size={15}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <span>Subscribe</span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </figure>
          </div>
        )}
      </section>
    </main>
  );
}
