import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  approveCourierQuoteThunk,
  getCouriersThunk,
} from '@/src/modules/logistics/net/logisticsThunks.js';
import DashboardTable from '@/src/core/components/DataTable.jsx';
import { ChevronDown, Settings } from 'lucide-react';
import { Button } from '@/src/core/components/ui/button.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { ClipLoader } from 'react-spinners';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';

export default function ProcessedCouriers() {
  const {
    get_couriers: { data: couriers },
    approve_courier_quote: { loading: approveCourierQuoteLoading },
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

  const approveQuote = (courierId) => {
    const queryParams = {
      approve: true,
    };

    const data = {
      courierId,
      queryParams,
    };
    dispatch(approveCourierQuoteThunk(data));
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
      action: (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer text-center"
            >
              <Settings size={20} />
              <ChevronDown size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mt-1">
            <div className="flex flex-col gap-y-2 rounded bg-popover p-2 mr-6 ">
              <span
                onClick={() => approveQuote(order.id)}
                className="cursor-pointer flex flex-col justify-center items-center text-blue text-base"
              >
                {approveCourierQuoteLoading === LoadingStates.pending ? (
                  <ClipLoader
                    color="#007cff"
                    loading={approveCourierQuoteLoading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <>Approve Quote</>
                )}
              </span>
              <span className="cursor-pointer text-red-400 text-base">
                Reject Quote
              </span>
            </div>
          </PopoverContent>
        </Popover>
      ),
    }));

  console.log('couriers', couriers);

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable columns={columns} data={new_table_data} />
    </section>
  );
}
