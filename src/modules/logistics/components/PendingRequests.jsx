import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getShipmentsThunk } from '@/src/modules/logistics/net/logisticsThunks.js';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { subRouteNames } from '@/src/core/navigation/routenames.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';

export default function PendingRequests() {
  const navigateTo = useNavigate();
  const {
    get_shipments: { loading: getShipmentsLoading, data: shipments },
  } = useSelector((state) => state.logistics);
  const dispatch = useDispatch();
  useEffect(() => {
    const queryParams = {
      status: 'pending',
    };
    dispatch(getShipmentsThunk(queryParams));
  }, []);

  const paginatedThunkCall = (page) => {
    dispatch(
      getShipmentsThunk({
        status: 'pending',
        page,
      }),
    );
  };

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
      accessorKey: 'receiver_name',
      header: () => <div className="text-grey-08 font-bold">Receiver Name</div>,
      cell: ({ row }) => row.getValue('receiver_name'),
    },
    {
      accessorKey: 'receiver_phone',
      header: () => (
        <div className="text-grey-08 font-bold">Receiver Phone</div>
      ),
      cell: ({ row }) => row.getValue('receiver_phone'),
    },
    {
      accessorKey: 'receiver_address',
      header: () => (
        <div className="text-grey-08 font-bold">Receiver Address</div>
      ),
      cell: ({ row }) => row.getValue('receiver_address'),
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
      accessorKey: 'orders',
      header: () => (
        <div className="text-grey-08 font-bold">Shipment Orders</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('orders')}</div>
      ),
    },
  ];
  const new_table_data =
    shipments && shipments.data && shipments.data.length > 0
      ? shipments.data.map((shipment) => {
          return {
            id: shipment.id,
            created_at: format(shipment.createdAt, 'PPP'),
            receiver_name: shipment?.shippingAddress?.receiverName,
            receiver_address: `${shipment?.shippingAddress?.receiverAddress} ,${shipment?.shippingAddress?.city} ,${shipment?.shippingAddress?.country}`,
            receiver_phone: shipment?.shippingAddress?.receiverPhone,
            orders: (
              <span
                onClick={routeToShipmentOrders(shipment.id)}
                className="hover:text-blue cursor-pointer underline underline-offset-1"
              >
                View Orders
              </span>
            ),
          };
        })
      : [];

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable
        columns={columns}
        data={new_table_data || []}
        isLoading={getShipmentsLoading === LoadingStates.pending}
        pageInfo={shipments?.pageInfo || {}}
        paginatedThunkCall={paginatedThunkCall}
      />
    </section>
  );
}
