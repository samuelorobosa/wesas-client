import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/core/components/ui/button.jsx';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import {
  createCourierRequestThunk,
  getCouriersThunk,
} from '@/src/modules/logistics/net/logisticsThunks.js';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';
import { toast } from 'sonner';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';

export default function ShipmentDetails({
  formData,
  setFormData,
  setIsDialogOpen,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();
  const formSchema = z.object({
    content: z.string().nonempty('Shipment Content is required'),
    weight: z.string().nonempty('Shipment Weight is required'),
    length: z.string().nonempty('Shipment Length is required'),
    width: z.string().nonempty('Shipment Width is required'),
    height: z.string().nonempty('Shipment Height is required'),
    value: z.string().nonempty('Shipment Value is required'),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      value: '',
    },
    mode: 'onChange',
  });
  async function onSubmit() {
    try {
      setIsCreating(true);
      await dispatch(createCourierRequestThunk(formData));
      const queryParams = {
        status: 'pending',
      };
      dispatch(getCouriersThunk(queryParams));
      setIsDialogOpen(false);
      toast.success('Courier request created successfully');
    } catch (e) {
      toast.error(e);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section>
      <header className="text-black mb-4">Goods Details</header>
      <div className="grid w-full items-center gap-4">
        <Form {...form}>
          <form
            autoComplete={'off'}
            className="grid w-full items-center gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
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
                            shipment: {
                              ...formData.shipment,
                              content: e.target.value,
                            },
                          });
                        }}
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
              name="weight"
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
                            shipment: {
                              ...formData.shipment,
                              weight: Number(e.target.value),
                            },
                          });
                        }}
                        placeholder="Weight in kg"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="length"
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
                            shipment: {
                              ...formData.shipment,
                              length: Number(e.target.value),
                            },
                          });
                        }}
                        placeholder="Length in cm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="width"
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
                            shipment: {
                              ...formData.shipment,
                              width: Number(e.target.value),
                            },
                          });
                        }}
                        placeholder="Width in cm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
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
                            shipment: {
                              ...formData.shipment,
                              height: Number(e.target.value),
                            },
                          });
                        }}
                        placeholder="Height in cm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Input
                        type="text"
                        value={`£${formatNumberWithCommas(value)}`}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/[£,]/g, '');
                          onChange(rawValue);
                          setFormData({
                            ...formData,
                            shipment: {
                              ...formData.shipment,
                              value: Number(rawValue),
                            },
                          });
                        }}
                        placeholder="Shipment Value"
                        ref={ref}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                disabled={isCreating || !form.formState.isValid}
                className="self-start bg-blue hover:bg-primary-tint-300"
              >
                {isCreating ? (
                  <ClipLoader
                    color="#fff"
                    loading={true}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <span>Request Service</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
