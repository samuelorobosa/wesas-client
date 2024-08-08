import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useEffect, useState } from 'react';
import {
  createShipmentRequestThunk,
  getOrdersThunk,
} from '@/src/modules/procurement/net/procurementThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@/src/core/components/ui/checkbox.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';

export default function ReceivedOrders() {
  const [loading, setLoading] = useState(false);
  const {
    get_orders: { data: orders, loading: getOrdersLoading },
  } = useSelector((state) => state.procurement);
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (value) {
              setSelectedRows(new_table_data);
            } else {
              setSelectedRows([]);
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            if (value) {
              setSelectedRows((prev) => [...prev, row.original]);
            } else {
              setSelectedRows((prev) =>
                prev.filter((r) => r.order_id !== row.original.order_id),
              );
            }
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'order_id',
      header: () => <div className="text-grey-08 font-bold">Order ID</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('order_id')}
        </div>
      ),
    },
    {
      accessorKey: 'product_link',
      header: () => <div className="text-grey-08 font-bold">Product Link</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('product_link')}
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: () => <div className="text-grey-08 font-bold">Description</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('description')}
        </div>
      ),
    },
    {
      accessorKey: 'unit_price',
      header: () => <div className="text-grey-08 font-bold">Unit Price</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('unit_price')}
        </div>
      ),
    },
    {
      accessorKey: 'qty',
      header: () => <div className="text-grey-08 font-bold">Quantity</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('qty')}</div>
      ),
    },
    {
      accessorKey: 'subtotal',
      header: () => <div className="text-grey-08 font-bold">Subtotal</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('subtotal')}
        </div>
      ),
    },
    {
      accessorKey: 'order_fee',
      header: () => (
        <div className="text-grey-08 font-bold">Order Fee (5%)</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('order_fee')}
        </div>
      ),
    },
    {
      accessorKey: 'total',
      header: () => <div className="text-grey-08 font-bold">Total</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('total')}</div>
      ),
    },
  ];

  useEffect(() => {
    const queryParams = {
      status: 'received',
    };
    dispatch(getOrdersThunk(queryParams));
  }, []);

  const filteredOrders =
    orders &&
    orders.data &&
    orders.data.length > 0 &&
    orders.data.filter((order) => order.shipmentId == null);

  const new_table_data =
    filteredOrders &&
    filteredOrders.length > 0 &&
    filteredOrders.map((order) => {
      return {
        order_id: order.orderId,
        product_link: (
          <span>
            {order.product.length > 50 ? (
              <a
                className="text-blue underline underline-offset-1"
                href={order.product}
                target="_blank"
              >
                {order.product.slice(0, 30)}...
              </a>
            ) : (
              <a
                className="text-blue underline underline-offset-1"
                href={order.product}
                target="_blank"
              >
                {order.product}
              </a>
            )}
          </span>
        ),
        unit_price: `£${formatNumberWithCommas(order.unitPrice)}`,
        qty: order.quantity,
        subtotal: `£${formatNumberWithCommas(order.subTotal)}`,
        order_fee: `£${formatNumberWithCommas(order.orderFee)}`,
        description: order.description,
        total: `£${formatNumberWithCommas(order.total)}`,
      };
    });

  const createShipmentRequest = async () => {
    const data = {
      orders: selectedRows.map((row) => row.order_id),
    };
    try {
      setLoading(true);
      await dispatch(createShipmentRequestThunk(data)).unwrap();
      toast.success('Shipment request created successfully');
      const queryParams = {
        status: 'received',
      };
      dispatch(getOrdersThunk(queryParams));
      setSelectedRows([]);
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };

  const paginatedThunkCall = (page) => {
    dispatch(
      getOrdersThunk({
        status: 'received',
        page,
      }),
    );
  };

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable
        columns={columns}
        data={new_table_data || []}
        isLoading={getOrdersLoading === LoadingStates.pending}
        pageInfo={orders?.pageInfo || {}}
        paginatedThunkCall={paginatedThunkCall}
      />
      <div className="flex justify-end items-center mt-5">
        {selectedRows.length > 0 && (
          <Button
            disabled={loading}
            onClick={createShipmentRequest}
            className="mt-4 bg-blue hover:bg-primary-tint-300"
          >
            {loading ? (
              <ClipLoader
                color="#fff"
                loading={true}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span>Create Shipment Request</span>
            )}
          </Button>
        )}
      </div>
    </section>
  );
}
