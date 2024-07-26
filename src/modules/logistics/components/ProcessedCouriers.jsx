import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  approveCourierQuoteThunk,
  getCouriersThunk,
} from '@/src/modules/logistics/net/logisticsThunks.js';
import DashboardTable from '@/src/core/components/DataTable.jsx';
import { ClipLoader } from 'react-spinners';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { Button } from '@/src/core/components/ui/button.jsx';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/src/core/components/ui/dialog.jsx';
import { DialogTrigger } from '@radix-ui/react-dialog';

export default function ProcessedCouriers() {
  const [isApproving, setIsApproving] = useState(false);
  const {
    get_couriers: { data: couriers, loading: getCouriersLoading },
  } = useSelector((state) => state.logistics);
  const dispatch = useDispatch();
  const columns = [
    {
      accessorKey: 'courier_id',
      header: () => <div className="text-grey-08 font-bold">Courier ID</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('courier_id')}
        </div>
      ),
    },
    {
      accessorKey: 'sender_name',
      header: () => <div className="text-grey-08 font-bold">Sender Name</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('sender_name')}
        </div>
      ),
    },
    {
      accessorKey: 'sender_email',
      header: () => <div className="text-grey-08 font-bold">Sender Email</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('sender_email')}
        </div>
      ),
    },
    {
      accessorKey: 'receiver_name',
      header: () => <div className="text-grey-08 font-bold">Receiver Name</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('receiver_name')}
        </div>
      ),
    },
    {
      accessorKey: 'receiver_email',
      header: () => (
        <div className="text-grey-08 font-bold">Receiver Email</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('receiver_email')}
        </div>
      ),
    },
    {
      accessorKey: 'shipment_content',
      header: () => (
        <div className="text-grey-08 font-bold">Shipment Content</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('shipment_content')}
        </div>
      ),
    },
    {
      accessorKey: 'shipment_value',
      header: () => (
        <div className="text-grey-08 font-bold">Shipment Value</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('shipment_value')}
        </div>
      ),
    },
    {
      accessorKey: 'courier_fee',
      header: () => <div className="text-grey-08 font-bold">Courier Fee</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('courier_fee')}
        </div>
      ),
    },
    {
      accessorKey: 'summary',
      header: () => <div className="text-grey-08 font-bold">Summary</div>,
      cell: ({ row }) => row.getValue('summary'),
    },
    {
      accessorKey: 'action',
      header: () => <div className="text-grey-08 font-bold">Action</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('action')}</div>
      ),
    },
  ];
  useEffect(() => {
    const queryParams = {
      status: 'processed',
    };
    dispatch(getCouriersThunk(queryParams));
  }, []);

  const approveQuote = async (courierId) => {
    const queryParams = {
      approve: true,
    };

    const data = {
      courierId,
      queryParams,
    };

    try {
      setIsApproving(true);
      await dispatch(approveCourierQuoteThunk(data)).unwrap();
      toast.success('Courier quote approved successfully');
      dispatch(getCouriersThunk({ status: 'processed' }));
    } catch (e) {
      toast.error(e);
    } finally {
      setIsApproving(false);
    }
  };

  const new_table_data =
    couriers &&
    couriers.length > 0 &&
    couriers.map((order) => ({
      courier_id: order.id,
      sender_name: order.sender.name,
      sender_email: order.sender.email,
      receiver_name: order.receiver.name,
      receiver_email: order.receiver.email,
      shipment_content: order.shipment.content,
      shipment_value: order.shipment.value,
      courier_fee: order.courierFee,
      summary: (
        <Dialog>
          <DialogTrigger asChild>
            <span className="underline underline-offset-1 whitespace-nowrap cursor-pointer hover:text-blue">
              View Summary
            </span>
          </DialogTrigger>
          <DialogContent>
            <div className="text-lg font-bold text-grey-08">
              Courier Request Summary
            </div>
            <section className="h-[280px] overflow-scroll">
              <div className="grid grid-cols-1 gap-4 mt-2">
                <div>
                  <div className="text-grey-08 font-bold">
                    Sender&apos;s Address
                  </div>
                  <div className="text-grey-08">{order.sender.address}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Sender&apos;s City
                  </div>
                  <div className="text-grey-08">{order.sender.city}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Sender&apos;s Country
                  </div>
                  <div className="text-grey-08">{order.sender.country}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Sender&apos;s Phone
                  </div>
                  <div className="text-grey-08">{order.sender.phoneNo}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Sender&apos;s Postal Code
                  </div>
                  <div className="text-grey-08">{order.sender.postalCode}</div>
                </div>

                <div>
                  <div className="text-grey-08 font-bold">
                    Receiver&apos;s Address
                  </div>
                  <div className="text-grey-08">{order.receiver.address}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Receiver&apos;s City
                  </div>
                  <div className="text-grey-08">{order.receiver.city}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Receiver&apos;s Country
                  </div>
                  <div className="text-grey-08">{order.receiver.country}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Receiver&apos;s Phone
                  </div>
                  <div className="text-grey-08">{order.receiver.phoneNo}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">
                    Receiver&apos;s Postal Code
                  </div>
                  <div className="text-grey-08">
                    {order.receiver.postalCode}
                  </div>
                </div>

                <div>
                  <div className="text-grey-08 font-bold">Shipment Content</div>
                  <div className="text-grey-08">{order.shipment.content}</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">Shipment Height</div>
                  <div className="text-grey-08">{order.shipment.height} cm</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">Shipment Length</div>
                  <div className="text-grey-08">{order.shipment.length} cm</div>
                </div>
                <div>
                  <div className="text-grey-08 font-bold">Shipment Width</div>
                  <div className="text-grey-08">{order.shipment.width} cm</div>
                </div>
              </div>
            </section>
          </DialogContent>
        </Dialog>
      ),
      action: (
        <Button
          variant="outline"
          onClick={() => approveQuote(order.id)}
          className="cursor-pointer flex flex-col justify-center items-center"
        >
          {isApproving ? (
            <ClipLoader
              color="#007cff"
              loading={true}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>Approve Quote</>
          )}
        </Button>
      ),
    }));

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable
        columns={columns}
        data={new_table_data}
        isLoading={getCouriersLoading === LoadingStates.pending}
      />
    </section>
  );
}