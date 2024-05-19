import logo from '../../../core/assets/images/logo.jpeg';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/core/components/ui/card.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import { Select, SelectTrigger } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { Checkbox } from '@/src/core/components/ui/checkbox.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import CaptchaInput from '@/src/modules/auth/components/CaptchaInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesThunk } from '@/src/modules/auth/net/authThunks.js';

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const openPage = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { register_user, countries } = useSelector((state) => state.auth);
  const countryOptions = countries.data.map(({ name, value }) => ({
    label: name,
    value,
  }));
  useEffect(() => {
    const data = {
      fields: 'name,cioc',
    };
    dispatch(getCountriesThunk(data));
  }, []);
  return (
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
            <CardTitle>Create a new account</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input placeholder="First Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input placeholder="Last Name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input placeholder="Username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input placeholder="Email" />
                </div>
                <div className="flex flex-col relative">
                  <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  {!isPasswordVisible ? (
                    <EyeOff
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                    />
                  ) : (
                    <Eye
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                </div>
                <div className="flex flex-col relative">
                  <Input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm Password"
                  />
                  {!isConfirmPasswordVisible ? (
                    <EyeOff
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                    />
                  ) : (
                    <Eye
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select>
                    <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {countryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.label}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Input type="password" placeholder="Phone" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <CaptchaInput />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the &nbsp;
                    <Link to={''} className="text-blue hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-y-2">
            <Button className="w-full">
              <span>Register</span>
            </Button>
            <p className="text-sm text-center">
              Already have an account? &nbsp;
              <Link to={''} className="text-blue hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </center>
    </div>
  );
}
