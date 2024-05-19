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
import { loginThunk } from '@/src/modules/auth/net/authThunks.js';
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

export default function LoginPage() {
  const openPage = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login_user } = useSelector((state) => state.auth);

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
      toast.error(
        login_user.error?.response?.data?.errorMessage ||
          'Failed to login. Please try again.',
      );
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
    },
    mode: 'onChange',
  });

  async function onSubmit(data) {
    setIsLoading(true);
    dispatch(loginThunk(data));
  }

  const handleCaptchaUpdate = (value) => {
    setCaptcha(value);
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
          <Card className="w-[450px]">
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

                    <CaptchaInput onChange={handleCaptchaUpdate} />

                    <div className="flex justify-end">
                      <Link
                        to={''}
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
    </Fragment>
  );
}
