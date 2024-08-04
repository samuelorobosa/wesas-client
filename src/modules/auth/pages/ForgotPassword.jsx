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
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  forgotPasswordThunk,
  resetPasswordThunk,
} from '@/src/modules/auth/net/authThunks.js';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { ClipLoader } from 'react-spinners';
import { routeNames } from '@/src/core/navigation/routenames.js';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/src/core/components/ui/alert-dialog.jsx';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/src/core/components/ui/input-otp.jsx';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialog2Open, setIsDialog2Open] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const form2Schema = z
    .object({
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
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  const form2 = useForm({
    resolver: zodResolver(form2Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      await dispatch(forgotPasswordThunk(data)).unwrap();
      setIsDialogOpen(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit2(data) {
    //restructure form data
    data.token = otp;
    delete data.confirmPassword;
    try {
      setIsLoading2(true);
      await dispatch(resetPasswordThunk(data)).unwrap();
      toast.success('Password reset successful. Proceed to login');
      navigate(routeNames.login);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading2(false);
    }
  }

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setIsDialog2Open(true);
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
              <CardTitle>Forgot Password</CardTitle>
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
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-y-2">
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid || isLoading}
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
                    Remembered your password? &nbsp;
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
            <span>Verify Email</span>
          </Button>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={isDialog2Open}
        onOpenChange={() => setIsDialog2Open(!isDialog2Open)}
      >
        <AlertDialogContent className="max-w-[400px] text-center rounded-md">
          <h1 className="text-xl font-semibold leading-none tracking-tight mt-4">
            Enter new password
          </h1>
          <Form {...form2}>
            <form onSubmit={form2.handleSubmit(onSubmit2)}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <FormField
                    control={form2.control}
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
                    control={form2.control}
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
                </div>
              </CardContent>
              <CardFooter className="flex flex-col w-full gap-y-2">
                <Button
                  type="submit"
                  disabled={!form2.formState.isValid || isLoading2}
                  className="w-full"
                >
                  {isLoading2 ? (
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
              </CardFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
