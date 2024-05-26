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
import { Textarea } from '@/src/core/components/ui/textarea.jsx';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/src/core/components/ui/button.jsx';
import { useState } from 'react';

export default function PaySupplier() {
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
      <h1 className="font-medium text-xl">Pay Supplier</h1>
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
                          placeholder="Payer's Name"
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
                        <Input type="text" {...field} placeholder="Amount" />
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
                        <Textarea {...field} placeholder="Content" />
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
                          placeholder="Account Number"
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
                        <Input type="text" {...field} placeholder="Sort Code" />
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
