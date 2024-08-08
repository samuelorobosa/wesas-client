import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getShipmentsThunk } from '@/src/modules/logistics/net/logisticsThunks.js';
import { format } from 'date-fns';
import { subRouteNames } from '@/src/core/navigation/routenames.js';
import { useNavigate } from 'react-router-dom';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';

export default function ConfirmedRequests() {
  const navigateTo = useNavigate();
  const {
    get_shipments: { loading: getShipmentsLoading, data: shipments },
  } = useSelector((state) => state.logistics);
  const dispatch = useDispatch();
  useEffect(() => {
    const queryParams = {
      status: 'confirmed',
    };
    dispatch(getShipmentsThunk(queryParams));
  }, []);

  const paginatedThunkCall = (page) => {
    dispatch(
      getShipmentsThunk({
        status: 'confirmed',
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
  ];

  const new_table_data =
    shipments && shipments.data && shipments.data.length > 0
      ? shipments.data.map((shipment) => {
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
