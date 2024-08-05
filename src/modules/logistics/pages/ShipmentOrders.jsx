import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getShipmentThunk } from '@/src/modules/logistics/net/logisticsThunks.js';
import { IoIosArrowRoundBack } from 'react-icons/io';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';

export default function ShipmentOrders() {
  const navigateTo = useNavigate();
  const {
    get_shipments: { loading: getShipmentLoading, data: shipments },
  } = useSelector((state) => state.logistics);
  const dispatch = useDispatch();
  let { orderId } = useParams();
  const currentShipment = shipments.data.find(
    (shipment) => shipment.id === orderId,
  );
  const columns =
    currentShipment.orders.length > 0
      ? [
          {
            accessorKey: 'id',
            header: () => (
              <div className="text-grey-08 font-bold">Order ID</div>
            ),
            cell: ({ row }) => row.getValue('id'),
          },
          {
            accessorKey: 'product',
            header: () => <div className="text-grey-08 font-bold">Product</div>,
            cell: ({ row }) => (
              <a
                target="_blank"
                className="underline hover:text-blue"
                href={row.getValue('product')}
              >
                {row.getValue('product').slice(0, 20) + '...'}
              </a>
            ),
          },
          {
            accessorKey: 'order_fee',
            header: () => (
              <div className="text-grey-08 font-bold">Order Fee</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('order_fee')}
              </div>
            ),
          },
          {
            accessorKey: 'unit_price',
            header: () => (
              <div className="text-grey-08 font-bold">Unit Price</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('unit_price')}
              </div>
            ),
          },
          {
            accessorKey: 'quantity',
            header: () => (
              <div className="text-grey-08 font-bold">Quantity</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('quantity')}
              </div>
            ),
          },
          {
            accessorKey: 'sub_total',
            header: () => (
              <div className="text-grey-08 font-bold">Sub Total</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('sub_total')}
              </div>
            ),
          },
          {
            accessorKey: 'total',
            header: () => <div className="text-grey-08 font-bold">Total</div>,
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('total')}
              </div>
            ),
          },
        ]
      : [
          {
            accessorKey: 'id',
            header: () => <div className="text-grey-08 font-bold">ID</div>,
            cell: ({ row }) => row.getValue('id'),
          },
          {
            accessorKey: 'content',
            header: () => <div className="text-grey-08 font-bold">Content</div>,
            cell: ({ row }) => row.getValue('content'),
          },
          {
            accessorKey: 'currency',
            header: () => (
              <div className="text-grey-08 font-bold">Currency</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('currency')}
              </div>
            ),
          },
          {
            accessorKey: 'bankDetails',
            header: () => (
              <div className="text-grey-08 font-bold">Bank Details</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('bankDetails')}
              </div>
            ),
          },
          {
            accessorKey: 'supplier_fee',
            header: () => (
              <div className="text-grey-08 font-bold">Supplier Fee</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('supplier_fee')}
              </div>
            ),
          },
          {
            accessorKey: 'sub_total',
            header: () => (
              <div className="text-grey-08 font-bold">Sub Total</div>
            ),
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('sub_total')}
              </div>
            ),
          },
          {
            accessorKey: 'total',
            header: () => <div className="text-grey-08 font-bold">Total</div>,
            cell: ({ row }) => (
              <div className="font-normal text-grey-08">
                {row.getValue('total')}
              </div>
            ),
          },
        ];
  const new_table_data =
    currentShipment?.orders.length > 0
      ? currentShipment?.orders?.map((order) => {
          return {
            id: order.orderId,
            product: order.product,
            order_fee: `£${formatNumberWithCommas(order.orderFee)}`,
            unit_price: `£${formatNumberWithCommas(order.unitPrice)}`,
            quantity: order.quantity,
            sub_total: `£${formatNumberWithCommas(order.subTotal)}`,
            total: `£${formatNumberWithCommas(order.total)}`,
          };
        })
      : currentShipment?.suppliers.map((supplier) => {
          return {
            id: supplier.id,
            content: supplier.content,
            currency: supplier.currency,
            bankDetails: (
              <div className="flex flex-col gap-y-2">
                <span>{supplier.accountName}</span>
                <span>{supplier.accountNo}</span>
                <span>{supplier.bankName}</span>
              </div>
            ),
            supplier_fee: `£${formatNumberWithCommas(supplier.supplierFee)}`,
            sub_total: `£${formatNumberWithCommas(supplier.subTotal)}`,
            total: `£${formatNumberWithCommas(supplier.total)}`,
          };
        });

  useEffect(() => {
    dispatch(getShipmentThunk(orderId));
  }, []);

  return (
    <main className="w-full">
      <header className="flex items-start">
        <aside
          onClick={() => navigateTo(-1)}
          className="flex items-center gap-x-1 text-xl cursor-pointer"
        >
          <IoIosArrowRoundBack />
          <span>Back</span>
        </aside>
        <h1 className="font-medium text-xl m-auto">
          Shipment Orders for {orderId}
        </h1>
      </header>
      <section>
        <section className="mt-4 bg-white p-4 rounded-md">
          <DashboardTable
            columns={columns}
            data={new_table_data}
            pageInfo={shipments?.pageInfo}
          />
        </section>
      </section>
    </main>
  );
}
