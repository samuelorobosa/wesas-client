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
import { useSelector } from 'react-redux';

export default function GoodsDetails() {
  const { countries } = useSelector((state) => state.auth);
  const countryOptions = countries.data.map(({ name, value }) => ({
    label: name,
    value,
  }));
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
    <section>
      <header className="text-black mb-4">Goods Details</header>
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
                        placeholder="Shipment Content"
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
                      <Input type="text" {...field} placeholder="Weight" />
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
                      <Input type="text" {...field} placeholder="Length" />
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
                      <Input type="text" {...field} placeholder="Width" />
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
                      <Input type="text" {...field} placeholder="Height" />
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
                        placeholder="Shipment Value"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </section>
  );
}
