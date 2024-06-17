import { ArrowLeftRight } from 'lucide-react';
import userProfile from '../../../core/assets/images/user_profile.svg';
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
import { Input } from '@/src/core/components/ui/input.jsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesThunk } from '@/src/modules/auth/net/authThunks.js';
import { Fragment, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { ClipLoader } from 'react-spinners';
import {
  getExchangeRatesThunk,
  getProfileThunk,
} from '@/src/modules/profile/net/profileThunks.js';
import Skeleton from 'react-loading-skeleton';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { getWalletDetailsThunk } from '@/src/modules/wallet/net/walletThunks.js';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';

export default function ProfilePage() {
  const {
    profile: {
      get_profile: { loading: profileLoading, data: profileData },
      get_exchange_rates: {
        data: exchangeRates,
        loading: exchangeRatesLoading,
      },
    },
    wallet: {
      wallet_details: { data: walletDetails, loading: walletDetailsLoading },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { countries } = useSelector((state) => state.auth);
  const countryOptions = countries.data.map(({ name, value }) => ({
    label: name,
    value,
  }));
  const countryValues = countryOptions.map((option) => option.label);

  const formSchema = z.object({
    firstname: z.string().min(1, { message: 'First name is required' }),
    lastname: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    country: z
      .enum(countryValues)
      .refine((value) => countryValues?.includes(value), {
        message: 'Invalid country selected',
      }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: profileData && profileData.firstname,
      lastname: profileData && profileData.lastname,
      email: profileData && profileData.email,
      country: profileData && profileData.country,
      phone: profileData && profileData.phone,
      address: profileData && profileData.shippingAddress,
    },
    mode: 'onChange',
  });

  async function onSubmit(formData) {
    // setIsLoading(true);
    console.log(formData);
  }

  useEffect(() => {
    const data = {
      fields: 'name,cioc',
    };
    dispatch(getCountriesThunk(data));
  }, []);

  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(getExchangeRatesThunk());
    dispatch(getWalletDetailsThunk());
  }, []);

  return (
    <main className="w-full">
      <h1 className="font-medium text-xl">User Profile</h1>
      <div className="bg-white rounded-md mt-4 w-full p-4">
        <p className="text-xl font-semibold pb-3 mt-1">
          Today&apos;s Exchange Rate
        </p>
        <section className="flex justify-between items-center bg-grey p-6 rounded-md">
          <p className="flex gap-x-2 items-center">
            <span>£</span>
            <span className="text-3xl font-semibold">1.00</span>
          </p>
          <div className="bg-blue p-4 rounded-full text-white">
            <ArrowLeftRight size={30} />
          </div>
          <div className="flex flex-col">
            <p className="flex gap-x-2 items-center">
              <span>₦</span>
              <span className="text-3xl font-semibold">
                {exchangeRatesLoading === LoadingStates.pending ? (
                  <Skeleton height={20} width={150} />
                ) : exchangeRates.data ? (
                  <>
                    {formatNumberWithCommas(exchangeRates['data'][0]['naira'])}
                  </>
                ) : (
                  '---'
                )}
              </span>
            </p>
          </div>
        </section>
      </div>
      <div className="bg-white rounded-md mt-10 w-full py-4">
        <header className="flex items-center justify-between px-4 border-b border-b-grey_02">
          <p className="text-xl font-semibold pb-3 mt-1">Personal Rate</p>
        </header>
        <section className="flex justify-between items-center bg-grey mx-4 mt-6 rounded-md">
          <aside className="flex gap-x-3 items-center p-4">
            <figure className="w-16 h-16">
              <img
                className="w-full h-full object-cover"
                src={userProfile}
                alt=""
              />
            </figure>
            <div>
              <p className="text-lg font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">ejwkkik160@vvatxiy.com</p>
            </div>
          </aside>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue hover:bg-primary-tint-300 text-white p-4 rounded-md cursor-pointer">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[400px]">
              <header className="text-center text-2xl font-semibold leading-none tracking-tight">
                Edit Profile
              </header>
              <div className="grid w-full items-center gap-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  defaultValue={
                                    profileData && profileData.firstname
                                  }
                                  type="text"
                                  {...field}
                                  placeholder="First Name"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-left" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  defaultValue={
                                    profileData && profileData.lastname
                                  }
                                  type="text"
                                  {...field}
                                  placeholder="Last Name"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-left" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  defaultValue={
                                    profileData && profileData.email
                                  }
                                  {...field}
                                  type="email"
                                  placeholder="Email"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-left" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  defaultValue={
                                    profileData && profileData.phone
                                  }
                                  {...field}
                                  type="text"
                                  placeholder="Phone"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-left" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={
                                    profileData && profileData.country
                                  }
                                >
                                  <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <SelectValue placeholder="Select a country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {countryOptions.map((option) => (
                                        <SelectItem
                                          key={option.label}
                                          value={option.label}
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
                        defaultValue={
                          profileData && profileData.shippingAddress
                        }
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Address"
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
                          <span>Save</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </section>
        <div className="mx-4 mt-6 grid grid-cols-[1fr_20px_1fr] gap-x-4">
          <aside>
            <p className="text-gray-500 uppercase text-sm">
              Personal Information
            </p>
            <div className="flex flex-col gap-y-3 mt-6">
              <p className="text-xs flex justify-between">
                <span>Account Balance</span>
                <span>
                  {walletDetailsLoading === LoadingStates.pending ? (
                    <Skeleton height={20} width={150} />
                  ) : walletDetails.balance ? (
                    <>
                      &#163;
                      {formatNumberWithCommas(walletDetails.balance) || '----'}
                    </>
                  ) : (
                    '---'
                  )}
                </span>
              </p>
              <p className="text-xs flex justify-between">
                <span>Name</span>
                <span>
                  {profileLoading === LoadingStates.pending ? (
                    <Skeleton height={20} width={150} />
                  ) : (
                    <Fragment>
                      {`${profileData.firstname} ${profileData.lastname}` ||
                        '---'}
                    </Fragment>
                  )}
                </span>
              </p>
              <p className="text-xs flex justify-between">
                <span>Contact Number</span>
                <span>
                  {profileLoading === LoadingStates.pending ? (
                    <Skeleton height={20} width={150} />
                  ) : (
                    profileData.phone || '---'
                  )}
                </span>
              </p>
              <p className="text-xs flex justify-between">
                <span>Username</span>
                <span>
                  {profileLoading === LoadingStates.pending ? (
                    <Skeleton height={20} width={150} />
                  ) : (
                    profileData.username || '---'
                  )}
                </span>
              </p>
              <p className="text-xs flex justify-between">
                <span>Email</span>
                <span>
                  {profileLoading === LoadingStates.pending ? (
                    <Skeleton height={20} width={150} />
                  ) : (
                    profileData.email || '---'
                  )}
                </span>
              </p>
              <p className="text-xs flex justify-between">
                <span>Account ID</span>
                <span>
                  {' '}
                  {profileLoading === LoadingStates.pending ? (
                    <Skeleton height={20} width={150} />
                  ) : (
                    profileData.id || '---'
                  )}
                </span>
              </p>
              <p className="text-xs flex justify-between">
                <span>Country</span>
                <span>
                  {profileLoading === LoadingStates.pending ? (
                    <Skeleton height={20} width={150} />
                  ) : (
                    profileData.country || '---'
                  )}
                </span>
              </p>
            </div>
          </aside>
          <div className="h-full bg-gray-300 w-px rounded-md"></div>
          <aside>
            <p className="text-gray-500 uppercase text-sm">Shipping Address</p>
            <p className="mt-6 text-sm mb-10">
              {profileLoading === LoadingStates.pending ? (
                <Skeleton height={20} width={150} />
              ) : (
                profileData.shippingAddress || 'Shipping Address not set'
              )}
            </p>
            <section className="flex items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="text-2xl font-semibold">150</span>
                <span className="text-gray-500">Total Order</span>
              </div>
              <div className="flex flex-col gap-y-2">
                <span className="text-2xl font-semibold">140</span>
                <span className="text-gray-500">Completed</span>
              </div>
              <div className="flex flex-col gap-y-2">
                <span className="text-2xl font-semibold">10</span>
                <span className="text-gray-500">Cancelled</span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
