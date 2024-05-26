import DashboardTable from '@/src/core/components/DataTable.jsx';

export default function ProcessingOrders() {
  const columns = [
    {
      accessorKey: 's_n',
      header: () => <div className="text-grey-08 font-bold">S/N</div>,
      cell: ({ row }) => row.getValue('s_n'),
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
      accessorKey: 'order_id',
      header: () => <div className="text-grey-08 font-bold">Order ID</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('order_id')}
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
      accessorKey: 'fee',
      header: () => <div className="text-grey-08 font-bold">Fee (5%)</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('fee')}</div>
      ),
    },
    {
      accessorKey: 'total',
      header: () => <div className="text-grey-08 font-bold">Total</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('total')}</div>
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
  const new_table_data = [
    {
      s_n: 1,
      product_link: 'https://www.amazon.com/12345',
      order_id: crypto.randomUUID(),
      unit_price: '₦1,000',
      qty: 10,
      subtotal: '₦10,000',
      fee: '₦500',
      total: '₦10,500',
      action: 'Remove',
    },
    {
      s_n: 1,
      product_link: 'https://www.amazon.com/12345',
      order_id: crypto.randomUUID(),
      unit_price: '₦1,000',
      qty: 10,
      subtotal: '₦10,000',
      fee: '₦500',
      total: '₦10,500',
      action: 'Remove',
    },
    {
      s_n: 1,
      product_link: 'https://www.amazon.com/12345',
      order_id: crypto.randomUUID(),
      unit_price: '₦1,000',
      qty: 10,
      subtotal: '₦10,000',
      fee: '₦500',
      total: '₦10,500',
      action: 'Remove',
    },
  ];

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable columns={columns} data={new_table_data} />
    </section>
  );
}
