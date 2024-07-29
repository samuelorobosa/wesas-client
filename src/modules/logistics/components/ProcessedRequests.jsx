import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  approveShipmentThunk,
  getShipmentsThunk,
} from '@/src/modules/logistics/net/logisticsThunks.js';
import { format } from 'date-fns';
import { subRouteNames } from '@/src/core/navigation/routenames.js';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/core/components/ui/button.jsx';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/core/components/ui/dialog.jsx';
import { ClipLoader } from 'react-spinners';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';

export default function ProcessedRequests() {
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [currentShipmentId, setCurrentShipmentId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigateTo = useNavigate();
  const {
    get_shipments: { loading: getShipmentsLoading, data: shipments },
  } = useSelector((state) => state.logistics);

  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = {
      status: 'processed',
    };
    dispatch(getShipmentsThunk(queryParams));
  }, []);

  const routeToShipmentOrders = (shipmentId) => () => {
    navigateTo(`${subRouteNames.shipmentOrders}/${shipmentId}`);
  };

  const columns = [
    {
      accessorKey: 'id',
      header: () => <div className="text-grey-08 font-bold">Shipment ID</div>,
      cell: ({ row }) => row.getValue('id'),
    },
    {
      accessorKey: 'weight',
      header: () => <div className="text-grey-08 font-bold">Weight</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('weight')}</div>
      ),
    },
    {
      accessorKey: 'shipping_fee',
      header: () => <div className="text-grey-08 font-bold">Shipping Fee</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('shipping_fee')}
        </div>
      ),
    },
    {
      accessorKey: 'orders',
      header: () => (
        <div className="text-grey-08 font-bold">Shipment Orders</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('orders')}</div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: () => <div className="text-grey-08 font-bold">Creation Date</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('created_at')}
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

  const handleShipmentApproval = async () => {
    try {
      setIsApproveLoading(true);
      await dispatch(approveShipmentThunk(currentShipmentId)).unwrap();
      toast.success('Shipment approved successfully');
      const queryParams = {
        status: 'processed',
      };
      dispatch(getShipmentsThunk(queryParams));
      setOpenDialog(false);
    } catch (e) {
      toast.error(e);
    } finally {
      setIsApproveLoading(false);
    }
  };

  const new_table_data =
    shipments && shipments.length > 0
      ? shipments.map((shipment) => {
          return {
            id: shipment.id,
            created_at: format(shipment.createdAt, 'PPP'),
            weight: `${shipment.weight} kg`,
            shipping_fee: `£${formatNumberWithCommas(shipment.shippingFee)}`,
            orders: (
              <span
                onClick={routeToShipmentOrders(shipment.id)}
                className="hover:text-blue cursor-pointer underline underline-offset-1"
              >
                View Orders
              </span>
            ),
            action: (
              <Button
                onClick={() => {
                  setOpenDialog(true);
                  setCurrentShipmentId(shipment.id);
                }}
                variant="outline"
              >
                <Settings size={20} />
              </Button>
            ),
          };
        })
      : [];

  return (
    <>
      <section className="mt-4 bg-white p-4 rounded-md">
        <DashboardTable
          columns={columns}
          data={new_table_data}
          isLoading={getShipmentsLoading === LoadingStates.pending}
        />
      </section>
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          setOpenDialog(false);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finalize Quote</DialogTitle>
            <DialogDescription>
              Do you want to approve this quote?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter className="flex justify-between w-full ">
            <Button
              onClick={() => setOpenDialog(false)}
              className="w-full "
              variant={'outline'}
            >
              <span>Cancel</span>
            </Button>
            <Button
              disabled={isApproveLoading}
              onClick={() => handleShipmentApproval()}
              className="w-full bg-blue hover:bg-primary-tint-300"
            >
              {isApproveLoading ? (
                <ClipLoader
                  color="#fff"
                  loading={true}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span>Approve Quote</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
