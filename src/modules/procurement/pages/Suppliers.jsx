import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/core/components/ui/dialog.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/core/components/ui/form.jsx';
import { Input } from '@/src/core/components/ui/input.jsx';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { createSupplierThunk } from '@/src/modules/procurement/net/procurementThunks.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import SuppliersTable from '@/src/modules/procurement/components/SuppliersTable.jsx';

export default function Suppliers() {
  const { loading } = useSelector((state) => state.procurement.create_supplier);
  const dispatch = useDispatch();
  const formSchema = z.object({
    name: z.string().nonempty('Name is required'),
    phoneNumber: z.string().nonempty('Phone Number is required'),
    bankName: z.string().nonempty('Bank Name is required'),
    accountNo: z.string().nonempty('Account Number is required'),
    sortCode: z.string().nonempty('Sort Code is required'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      bankName: '',
      accountNo: '',
      sortCode: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(formData) {
    //rebuild formData
    const __formData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      bankDetails: {
        bankName: formData.bankName,
        accountNo: formData.accountNo,
        sortCode: formData.sortCode,
      },
    };
    dispatch(createSupplierThunk(__formData));
  }
  return (
    <main className="w-full">
      <header className="flex items-center justify-between">
        <h1 className="font-medium text-xl">All Suppliers</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4 bg-blue hover:bg-primary-tint-300">
              Create Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <header className="font-semibold text-base">Create Supplier</header>
            <div className="grid w-full items-center gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Name"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
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
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Bank Name"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accountNo"
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
                      name="sortCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-1.5">
                              <Input
                                type="text"
                                {...field}
                                placeholder="Sort Code"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-left" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={
                        loading === LoadingStates.pending ||
                        !form.formState.isValid
                      }
                      className="w-full"
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
                        <span>Create Supplier</span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <section className="mt-4">
        <SuppliersTable />
      </section>
    </main>
  );
}
