import logo from '../../../core/assets/images/logo.jpeg';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/core/components/ui/card.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { Checkbox } from '@/src/core/components/ui/checkbox.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import CaptchaInput from '@/src/modules/auth/components/CaptchaInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  getCountriesThunk,
  registerUserThunk,
  verifyEmailThunk,
} from '@/src/modules/auth/net/authThunks.js';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/src/core/components/ui/alert-dialog.jsx';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/src/core/components/ui/input-otp.jsx';
import { secretKeys } from '@/src/core/utils/secretKeys.js';
import { saveToLocalStorage } from '@/src/core/utils/saveToLocalStorage.js';
import { routeNames, subRouteNames } from '@/src/core/navigation/routenames.js';

export default function RegistrationPage() {
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openPage = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { register_user, countries, verify_email } = useSelector(
    (state) => state.auth,
  );
  const countryOptions = countries.data.map(({ name, value }) => ({
    label: name,
    value,
  }));
  const countryValues = countryOptions.map((option) => option.label);

  useEffect(() => {
    const data = {
      fields: 'name,cioc',
    };
    dispatch(getCountriesThunk(data));
  }, []);

  useEffect(() => {
    if (register_user.loading === LoadingStates.fulfilled) {
      setIsLoading(false);
      toast.success(
        register_user.response?.data?.message || 'Registration successful!',
      );
      setIsDialogOpen(true);
    } else if (register_user.loading === LoadingStates.rejected) {
      setIsLoading(false);
      toast.error(
        register_user.error?.response?.data?.errorMessage ||
          'Failed to register. Please try again.',
      );
    }
  }, [register_user.loading]);

  useEffect(() => {
    if (verify_email.loading === LoadingStates.fulfilled) {
      setIsVerifying(false);
      toast.success('Email verification successful!');
      saveToLocalStorage(
        secretKeys.USER_TOKEN,
        verify_email.response?.data?.token,
      );
      openPage(`${routeNames.dashboard}/${subRouteNames.profile}`);
    } else if (verify_email.loading === LoadingStates.rejected) {
      setIsVerifying(false);
      toast.error(
        verify_email.error?.response?.data?.errorMessage ||
          'Failed to verify email. Please try again.',
      );
    }
  }, [verify_email.loading]);

  const formSchema = z
    .object({
      firstname: z.string().min(1, { message: 'First name is required' }),
      lastname: z.string().min(1, { message: 'Last name is required' }),
      username: z.string().min(1, { message: 'Username is required' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .refine((value) => /[A-Z]/.test(value), {
          message: 'Password must contain at least one uppercase letter',
        })
        .refine((value) => /[a-z]/.test(value), {
          message: 'Password must contain at least one lowercase letter',
        })
        .refine((value) => /[0-9]/.test(value), {
          message: 'Password must contain at least one number',
        })
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
          message: 'Password must contain at least one special character',
        }),
      confirmPassword: z.string(),
      country: z
        .enum(countryValues)
        .refine((value) => countryValues.includes(value), {
          message: 'Invalid country selected',
        }),
      phone: z.string().min(1, { message: 'Phone number is required' }),
      terms: z.boolean().refine((value) => value, {
        message: 'You must agree to the terms and conditions',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: 'Nigeria',
      phone: '',
      terms: false,
      captcha: false,
    },
    mode: 'onChange',
  });

  async function onSubmit(formData) {
    setIsLoading(true);
    setUserEmail(formData.email);
    delete formData.terms;
    delete formData.confirmPassword;
    dispatch(registerUserThunk(formData));
  }

  const handleCaptchaUpdate = (value) => {
    setCaptcha(value);
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    dispatch(verifyEmailThunk({ otp, email: userEmail }));
  };

  return (
    <Fragment>
      <div>
        <center>
          <header className="flex items-center my-10 gap-x-1.5 justify-center">
            <img className="w-6" src={logo} alt="WeShopAndShip logo" />
            <p className="text-2xl flex items-center gap-x-1">
              <span> We</span>
              <b>Shop</b>
              <span>And</span>
              <b>Ship</b>
            </p>
          </header>
          <Card className="sm:max-w-[450px]">
            <CardHeader>
              <CardTitle>Create a new account</CardTitle>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
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
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Username"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col relative">
                              <Input
                                {...field}
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Password"
                              />
                              {!isPasswordVisible ? (
                                <EyeOff
                                  onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                  }
                                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                                />
                              ) : (
                                <Eye
                                  onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                  }
                                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col relative">
                              <Input
                                {...field}
                                type={
                                  isConfirmPasswordVisible ? 'text' : 'password'
                                }
                                placeholder="Confirm Password"
                              />
                              {!isConfirmPasswordVisible ? (
                                <EyeOff
                                  onClick={() =>
                                    setIsConfirmPasswordVisible(
                                      !isConfirmPasswordVisible,
                                    )
                                  }
                                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                                />
                              ) : (
                                <Eye
                                  onClick={() =>
                                    setIsConfirmPasswordVisible(
                                      !isConfirmPasswordVisible,
                                    )
                                  }
                                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                                />
                              )}
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
                                defaultValue={field.value}
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
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
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
                      name="captcha"
                      render={({ field }) => (
                        <CaptchaInput
                          onChange={(value) => {
                            field.onChange(value);
                            handleCaptchaUpdate(value);
                          }}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I agree to the &nbsp;
                                <Link
                                  to={''}
                                  className="text-blue hover:underline"
                                >
                                  terms and conditions
                                </Link>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-y-2">
                  <Button
                    type="submit"
                    disabled={!captcha || !form.formState.isValid || isLoading}
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
                      <span>Register</span>
                    )}
                  </Button>
                  <p className="text-sm text-center">
                    Already have an account? &nbsp;
                    <Link
                      to={routeNames.login}
                      className="text-blue hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </center>
      </div>
      <AlertDialog
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      >
        <AlertDialogContent className="max-w-[400px] text-center rounded-md">
          <h1 className="text-xl font-semibold leading-none tracking-tight mt-4">
            Enter the OTP sent to your email
          </h1>
          <div className="flex justify-center mt-10">
            <InputOTP
              onChange={(newValue) => setOtp(newValue)}
              value={otp}
              maxLength={6}
            >
              <InputOTPGroup className="gap-2 justify-between">
                <InputOTPSlot
                  className="rounded text-grey-08 text-3xl font-bold border border-grey-02 px-2.5 py-1"
                  index={0}
                />
                <InputOTPSlot
                  className="rounded text-grey-08 text-3xl font-bold border border-grey-02 px-2.5 py-1"
                  index={1}
                />
                <InputOTPSlot
                  className="rounded text-grey-08 text-3xl font-bold border border-grey-02 px-2.5 py-1"
                  index={2}
                />
                <InputOTPSlot
                  className="rounded text-grey-08 text-3xl font-bold border border-grey-02 px-2.5 py-1"
                  index={3}
                />
                <InputOTPSlot
                  className="rounded text-grey-08 text-3xl font-bold border border-grey-02 px-2.5 py-1"
                  index={4}
                />
                <InputOTPSlot
                  className="rounded text-grey-08 text-3xl font-bold border border-grey-02 px-2.5 py-1"
                  index={5}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            onClick={handleEmailVerification}
            disabled={otp.length < 6}
            className="mt-4"
          >
            {isVerifying ? (
              <ClipLoader
                color="#fff"
                loading={isLoading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span>Verify Email</span>
            )}
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
