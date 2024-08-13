import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCountriesThunk } from '@/src/modules/auth/net/authThunks.js';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/core/components/ui/button.jsx';

export default function ReceiversDetails({
  formData,
  setFormData,
  activeTab,
  setActiveTab,
}) {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.auth);
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

  const formSchema = z.object({
    name: z.string().nonempty('Receiver Name is required'),
    phoneNo: z.string().nonempty('Receiver Phone Number is required'),
    address: z.string().nonempty('Receiver Address is required'),
    city: z.string().nonempty('Receiver City is required'),
    postalCode: z.string().nonempty('Receiver Postal Code is required'),
    country: z.string().nonempty('Receiver Country is required'),
    email: z
      .string()
      .email('Receiver Email must be a valid email')
      .nonempty('Receiver Email is required'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNo: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      email: '',
    },
    mode: 'onChange',
  });

  async function onSubmit() {
    setActiveTab(activeTab + 1);
  }

  return (
    <section>
      <header className="text-black mb-4">Receiver&apos;s Details</header>
      <div className="grid w-full items-center gap-4">
        <Form {...form}>
          <form
            autoComplete={'off'}
            className="grid w-full items-center gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData({
                            ...formData,
                            receiver: {
                              ...formData.receiver,
                              name: e.target.value,
                            },
                          });
                        }}
                        placeholder="Receiver's Name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData({
                            ...formData,
                            receiver: {
                              ...formData.receiver,
                              phoneNo: e.target.value,
                            },
                          });
                        }}
                        placeholder="Phone Number"
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
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData({
                            ...formData,
                            receiver: {
                              ...formData.receiver,
                              email: e.target.value,
                            },
                          });
                        }}
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData({
                            ...formData,
                            receiver: {
                              ...formData.receiver,
                              address: e.target.value,
                            },
                          });
                        }}
                        placeholder="Address"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData({
                            ...formData,
                            receiver: {
                              ...formData.receiver,
                              city: e.target.value,
                            },
                          });
                        }}
                        placeholder="City"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData({
                            ...formData,
                            receiver: {
                              ...formData.receiver,
                              postalCode: e.target.value,
                            },
                          });
                        }}
                        placeholder="Post Code"
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
                        onValueChange={(e) => {
                          setFormData({
                            ...formData,
                            receiver: {
                              ...formData.receiver,
                              country: e,
                            },
                          });
                          field.onChange(e);
                        }}
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

            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="self-start bg-blue hover:bg-primary-tint-300"
              >
                <span>Next</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
