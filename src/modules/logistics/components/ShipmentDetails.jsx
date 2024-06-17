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
import { useDispatch, useSelector } from 'react-redux';
import { createCourierRequestThunk } from '@/src/modules/logistics/net/logisticsThunks.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ShipmentDetails({ formData, setFormData }) {
  const { loading } = useSelector(
    (state) => state.logistics.create_courier_request,
  );
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
    dispatch(createCourierRequestThunk(formData));
  }

  useEffect(() => {
    if (loading === LoadingStates.fulfilled) {
      toast.success('Courier request created successfully');
    } else if (loading === LoadingStates.rejected) {
      toast.error('Failed to create courier request');
    }
  }, [loading]);
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
                        placeholder="Weight"
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
                        placeholder="Length"
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
                        placeholder="Width"
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
                        placeholder="Height"
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
                              value: Number(e.target.value),
                            },
                          });
                        }}
                        placeholder="Shipment Value"
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
                disabled={
                  loading === LoadingStates.pending || !form.formState.isValid
                }
                className="self-start bg-blue hover:bg-primary-tint-300"
              >
                {loading === LoadingStates.pending ? (
                  <ClipLoader
                    color="#fff"
                    loading={loading === LoadingStates.pending}
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
