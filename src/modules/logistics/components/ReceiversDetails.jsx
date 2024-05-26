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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';

export default function ReceiversDetails() {
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
      <header className="text-black mb-4">Receiver's Details</header>
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
          </div>
        </form>
      </Form>
    </section>
  );
}
