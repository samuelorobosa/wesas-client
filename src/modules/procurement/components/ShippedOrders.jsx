import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useEffect } from 'react';
import { getOrdersThunk } from '@/src/modules/procurement/net/procurementThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';

export default function ShippedOrders() {
  const { data: orders, loading } = useSelector(
    (state) => state.procurement.get_orders,
  );
  const dispatch = useDispatch();
  const columns = [
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
      accessorKey: 'supplier_fee',
      header: () => (
        <div className="text-grey-08 font-bold">Supplier Fee (3%)</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('supplier_fee')}
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
      status: 'shipped',
    };
    dispatch(getOrdersThunk(queryParams));
  }, []);

  const new_table_data =
    orders &&
    orders.data &&
    orders.data.length > 0 &&
    orders.data.map((order) => ({
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
      supplier_fee: `£${formatNumberWithCommas(order.supplierFee)}`,
      description: order.description,
      total: `£${formatNumberWithCommas(order.total)}`,
    }));

  const paginatedThunkCall = (page) => {
    dispatch(
      getOrdersThunk({
        status: 'shipped',
        page,
      }),
    );
  };

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      {orders.data && (
        <DashboardTable
          columns={columns}
          data={new_table_data}
          isLoading={loading === LoadingStates.pending}
          pageInfo={orders?.pageInfo}
          paginatedThunkCall={paginatedThunkCall}
        />
      )}
    </section>
  );
}
