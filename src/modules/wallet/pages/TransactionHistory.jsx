import DashboardTable from '@/src/core/components/DataTable.jsx';

export default function TransactionHistory() {
  const columns = [
    {
      accessorKey: 'trxID',
      header: () => (
        <div className="text-grey-08 font-bold">Transaction ID</div>
      ),
      cell: ({ row }) => row.getValue('trxID'),
    },
    {
      accessorKey: 'current',
      header: () => <div className="text-grey-08 font-bold">Current</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('current')}
        </div>
      ),
    },
    {
      accessorKey: 'initial',
      header: () => <div className="text-grey-08 font-bold">Initial</div>,

      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('initial')}
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-grey-08 font-bold">Amount</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('amount')}</div>
      ),
    },
    {
      accessorKey: 'type',
      header: () => <div className="text-grey-08 font-bold">Type</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('type')}</div>
      ),
    },
    {
      accessorKey: 'ref',
      header: () => <div className="text-grey-08 font-bold">Reference</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('ref')}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => <div className="text-grey-08 font-bold">Date</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('date')}</div>
      ),
    },
  ];
  const new_table_data = [
    {
      trxID: crypto.randomUUID(),
      current: '$2.5',
      initial: '$8.88',
      amount: '$7.6',
      type: 'Credit',
      ref: 'Credited a certain amount',
      date: '2021-08-23',
    },
    {
      trxID: crypto.randomUUID(),
      current: '$2.5',
      initial: '$8.88',
      amount: '$7.6',
      type: 'Credit',
      ref: 'Credited a certain amount',
      date: '2021-08-23',
    },
    {
      trxID: crypto.randomUUID(),
      current: '$2.5',
      initial: '$8.88',
      amount: '$7.6',
      type: 'Credit',
      ref: 'Credited a certain amount',
      date: '2021-08-23',
    },
  ];
  return (
    <main className="w-full">
      <h1 className="font-medium text-xl">Transaction History</h1>
      <section className="mt-4 bg-white p-4 rounded-md">
        <DashboardTable columns={columns} data={new_table_data} />
      </section>
    </main>
  );
}
