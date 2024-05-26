import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/src/core/components/ui/button.jsx';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { useSelector } from 'react-redux';

export default function RequestShipping() {
  const { countries } = useSelector((state) => state.auth);
  const countryOptions = countries.data.map(({ name, value }) => ({
    label: name,
    value,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  async function onSubmit(formData) {
    // setIsLoading(true);
    console.log(formData);
  }
  return (
    <main className="w-full">
      <h1 className="font-medium text-xl">Request Shipping</h1>
      <section className="rounded-md bg-white p-4 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="payername"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-1.5">
                        <Input
                          type="text"
                          {...field}
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
                name="payername"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-1.5">
                        <Input
                          type="text"
                          {...field}
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
                name="payername"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-1.5">
                        <Input
                          type="text"
                          {...field}
                          placeholder="Receiver's Address"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payername"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-1.5">
                        <Input type="text" {...field} placeholder="City" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payername"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-1.5">
                        <Input type="text" {...field} placeholder="Post Code" />
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

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="self-start"
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
                    <span>Place Order</span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
