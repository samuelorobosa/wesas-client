import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/src/core/components/ui/button.jsx';
import { Dialog, DialogContent } from '@/src/core/components/ui/dialog.jsx';
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
import { Fragment, useEffect, useMemo, useState } from 'react';
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
  editProfileThunk,
  getExchangeRatesThunk,
  getProfileThunk,
} from '@/src/modules/profile/net/profileThunks.js';
import Skeleton from 'react-loading-skeleton';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { getWalletDetailsThunk } from '@/src/modules/wallet/net/walletThunks.js';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';
import { identicon } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { toast } from 'sonner';
import { Textarea } from '@/src/core/components/ui/textarea.jsx';
import { RxHamburgerMenu } from 'react-icons/rx';
import { toggleCollapse } from '@/src/modules/dashboard/state/navDrawerSlice.js';
import useWindowSize from '@/src/core/utils/useWindowSize.js';

export default function ProfilePage() {
  const { width } = useWindowSize();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
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
  const [isLoading_2, setIsLoading_2] = useState(false);
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

  const formSchema2 = z.object({
    receiverName: z.string().min(1, { message: 'Receiver  name is required' }),
    receiverAddress: z.string().min(1, { message: 'Address is required' }),
    receiverPhone: z.string().min(1, { message: 'Phone number is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    postalCode: z.string(),
    country: z
      .enum(countryValues)
      .refine((value) => countryValues?.includes(value), {
        message: 'Invalid country selected',
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: profileData && profileData.firstname,
      lastname: profileData && profileData.lastname,
      email: profileData && profileData.email,
      country: profileData && profileData.country,
      phone: profileData && profileData.phone,
      address: profileData && profileData.address,
    },
    mode: 'onChange',
  });

  const form2 = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      receiverName:
        profileData && profileData?.shippingAddress?.receiverName
          ? profileData?.shippingAddress?.receiverName
          : '',
      receiverAddress:
        profileData && profileData?.shippingAddress?.receiverAddress
          ? profileData?.shippingAddress?.receiverAddress
          : '',
      receiverPhone:
        profileData && profileData?.shippingAddress?.receiverPhone
          ? profileData?.shippingAddress?.receiverPhone
          : '',
      city:
        profileData && profileData?.shippingAddress?.city
          ? profileData?.shippingAddress?.city
          : '',
      postalCode:
        profileData && profileData?.shippingAddress?.postalCode
          ? profileData?.shippingAddress?.postalCode
          : '',
      country:
        profileData && profileData?.shippingAddress?.country
          ? profileData?.shippingAddress?.country
          : '',
    },
    mode: 'onChange',
  });

  async function onSubmit(formData) {
    try {
      setIsLoading(true);
      await dispatch(editProfileThunk(formData)).unwrap();
      setIsDialogOpen(false);
      toast.success('Profile updated successfully');
      dispatch(getProfileThunk());
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit2(formData) {
    const data = {
      shippingAddress: formData,
    };
    try {
      setIsLoading_2(true);
      await dispatch(editProfileThunk(data)).unwrap();
      setIsShippingDialogOpen(false);
      toast.success('Address updated successfully');
      dispatch(getProfileThunk());
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoading_2(false);
    }
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

  const svg = useMemo(() => {
    return createAvatar(identicon, {
      seed: crypto.getRandomValues(new Uint32Array(1))[0],
    }).toDataUriSync();
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
        <h1 className="font-medium text-xl">User Profile</h1>
      </aside>
      <div className="bg-white rounded-md mt-4 w-full p-4">
        <p className="text-xl font-semibold pb-3 mt-1">
          Today&apos;s Exchange Rate
        </p>
        <section className="flex justify-between items-center bg-grey p-6 rounded-md">
          <p className="flex gap-x-2 items-center">
            <span>£</span>
            <span className="text-3xl font-semibold">1.00</span>
          </p>
          <div className="bg-blue p-2 rounded-full text-white">
            <ArrowLeftRight size={20} />
          </div>
          <div className="flex flex-col">
            <p className="flex gap-x-2 items-center">
              <span>₦</span>
              <span className="text-3xl font-semibold">
                {exchangeRatesLoading === LoadingStates.pending ? (
                  <Skeleton height={20} width={150} />
                ) : exchangeRates.data?.[0]?.['naira'] ? (
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
          <p className="text-xl font-semibold pb-3 mt-1">Personal Data</p>
        </header>
        <section className="flex md:flex-row flex-col justify-between md:items-center items-start pb-2 bg-grey mx-4 mt-6 rounded-md">
          <aside className="flex gap-x-3 items-center p-4">
            <figure className="w-16 h-16">
              <img className="w-full h-full object-cover" src={svg} alt="" />
            </figure>
            <div>
              <p className="text-lg font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">ejwkkik160@vvatxiy.com</p>
            </div>
          </aside>
          <Button
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue hover:bg-primary-tint-300 text-white p-4 rounded-md cursor-pointer"
          >
            Edit Profile
          </Button>
        </section>
        <div className="mx-4 mt-6 grid md:grid-cols-[1fr_20px_1fr] grid-cols-1   gap-x-4">
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
          <aside className="md:mt-0 mt-10">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 uppercase text-sm">
                Shipping Address
              </p>
              <Button
                onClick={() => setIsShippingDialogOpen(true)}
                className="bg-blue hover:bg-primary-tint-300 text-white p-4 rounded-md cursor-pointer"
              >
                Set up
              </Button>
            </div>
            <p className="mt-6 text-sm mb-10">
              {profileLoading === LoadingStates.pending ? (
                <Skeleton height={20} width={150} />
              ) : profileData.shippingAddress ? (
                <div className="flex flex-col gap-y-2">
                  <div className="text-grey-08 font-normal">
                    {profileData.shippingAddress.receiverName}
                  </div>
                  <div className="text-grey-08 font-normal">
                    {profileData.shippingAddress.receiverAddress},{' '}
                    {profileData.shippingAddress.city},{' '}
                    {profileData.shippingAddress.country}
                  </div>
                  <div className="text-grey-08 font-normal">
                    {profileData.shippingAddress.receiverPhone}
                  </div>
                </div>
              ) : (
                `Shipping Address not set`
              )}
            </p>
          </aside>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                              defaultValue={profileData && profileData.lastname}
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
                              defaultValue={profileData && profileData.email}
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
                              defaultValue={profileData && profileData.phone}
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
                            <Select onValueChange={field.onChange}>
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
                    defaultValue={profileData && profileData.shippingAddress}
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Textarea
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
                  <Button type="submit" disabled={isLoading} className="w-full">
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
      <Dialog
        open={isShippingDialogOpen}
        onOpenChange={setIsShippingDialogOpen}
      >
        <DialogContent className="max-w-[400px]">
          <header className="text-center text-2xl font-semibold leading-none tracking-tight">
            Shipping Address
          </header>
          <div className="grid w-full items-center gap-4">
            <Form {...form2}>
              <form onSubmit={form2.handleSubmit(onSubmit2)}>
                <div className="grid w-full items-center gap-4">
                  <FormField
                    control={form2.control}
                    name="receiverName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Input
                              defaultValue={
                                profileData &&
                                profileData?.shippingAddress?.receiverName
                                  ? profileData?.shippingAddress?.receiverName
                                  : ''
                              }
                              type="text"
                              {...field}
                              placeholder="Receiver Name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form2.control}
                    name="receiverAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Input
                              defaultValue={
                                profileData &&
                                profileData?.shippingAddress?.receiverAddress
                                  ? profileData?.shippingAddress
                                      ?.receiverAddress
                                  : ''
                              }
                              type="text"
                              {...field}
                              placeholder="Reciever Address"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form2.control}
                    name="receiverPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Input
                              defaultValue={
                                profileData &&
                                profileData?.shippingAddress?.receiverPhone
                                  ? profileData?.shippingAddress?.receiverPhone
                                  : ''
                              }
                              {...field}
                              type="text"
                              placeholder="Receiver Phone"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form2.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Input
                              defaultValue={
                                profileData &&
                                profileData?.shippingAddress?.city
                                  ? profileData?.shippingAddress?.city
                                  : ''
                              }
                              {...field}
                              type="text"
                              placeholder="City"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form2.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Input
                              defaultValue={
                                profileData &&
                                profileData?.shippingAddress?.postalCode
                                  ? profileData?.shippingAddress?.postalCode
                                  : ''
                              }
                              {...field}
                              type="text"
                              placeholder="Postal Code"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form2.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue=""
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

                  <Button
                    type="submit"
                    disabled={isLoading_2 || !form2.formState.isValid}
                    className="w-full"
                  >
                    {isLoading_2 ? (
                      <ClipLoader
                        color="#fff"
                        loading={true}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
