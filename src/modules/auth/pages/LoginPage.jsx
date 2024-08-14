import logo from '../../../core/assets/images/logo.jpeg';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/core/components/ui/card.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import CaptchaInput from '@/src/modules/auth/components/CaptchaInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  loginThunk,
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
import { routeNames, subRouteNames } from '@/src/core/navigation/routenames.js';
import { secretKeys } from '@/src/core/utils/secretKeys.js';
import { saveToLocalStorage } from '@/src/core/utils/saveToLocalStorage.js';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/src/core/components/ui/alert-dialog.jsx';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/src/core/components/ui/input-otp.jsx';

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const openPage = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login_user } = useSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  useEffect(() => {
    if (login_user.loading === LoadingStates.fulfilled) {
      setIsLoading(false);
      toast.success('Login successful!');
      saveToLocalStorage(
        secretKeys.USER_TOKEN,
        login_user.response?.data?.token,
      );
      openPage(`${routeNames.dashboard}/${subRouteNames.profile}`);
    } else if (login_user.loading === LoadingStates.rejected) {
      setIsLoading(false);
      if (
        login_user.error ===
        'An otp has been sent to your mail box, Check your mail to veriy your email address'
      ) {
        setIsDialogOpen(true);
      } else {
        toast.error(login_user.error);
      }
    }
  }, [login_user.loading]);

  const formSchema = z.object({
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
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      captcha: false,
    },
    mode: 'onChange',
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setUserEmail(data.email);
    dispatch(loginThunk(data));
  }

  const handleCaptchaUpdate = (value) => {
    setCaptcha(value);
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      await dispatch(verifyEmailThunk({ otp, email: userEmail })).unwrap();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsVerifying(false);
    }
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
              <CardTitle>Sign in to your account</CardTitle>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
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

                    <div className="flex justify-end">
                      <Link
                        to={routeNames.forgotPassword}
                        className="text-blue text-right inline-block hover:underline"
                      >
                        Forgot Password
                      </Link>
                    </div>
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
                      <span>Login</span>
                    )}
                  </Button>
                  <p className="text-sm text-center">
                    Don&apos;t have an account? &nbsp;
                    <Link
                      to={routeNames.register}
                      className="text-blue hover:underline"
                    >
                      Register
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
