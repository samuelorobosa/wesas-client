import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useEffect } from 'react';
import { getSuppliersThunk } from '@/src/modules/procurement/net/procurementThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';

export default function ProcessedPaySupplier() {
  const { data: suppliers, loading } = useSelector(
    (state) => state.procurement.get_suppliers,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = {
      status: 'processed',
    };
    dispatch(getSuppliersThunk(queryParams));
  }, []);

  const columns = [
    {
      accessorKey: 'id',
      header: () => <div className="text-grey-08 font-bold">ID</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'content',
      header: () => <div className="text-grey-08 font-bold">Content</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('content')}
        </div>
      ),
    },
    {
      accessorKey: 'currency',
      header: () => <div className="text-grey-08 font-bold">Currency</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('currency')}
        </div>
      ),
    },
    {
      accessorKey: 'bankDetails',
      header: () => <div className="text-grey-08 font-bold">Bank Details</div>,
      cell: ({ row }) => row.getValue('bankDetails'),
    },
    {
      accessorKey: 'supplier_fee',
      header: () => <div className="text-grey-08 font-bold">Supplier Fee</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('supplier_fee')}
        </div>
      ),
    },
    {
      accessorKey: 'subtotal',
      header: () => <div className="text-grey-08 font-bold">SubTotal</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('subtotal')}
        </div>
      ),
    },
    {
      accessorKey: 'phoneNumber',
      header: () => <div className="text-grey-08 font-bold">Phone Number</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('phoneNumber')}
        </div>
      ),
    },
    {
      accessorKey: 'sortCode',
      header: () => <div className="text-grey-08 font-bold">Sort Code</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('sortCode') || 'N/A'}
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

  const new_table_data =
    suppliers &&
    suppliers.data &&
    suppliers.data.length > 0 &&
    suppliers.data.map((supplier) => ({
      id: supplier.id,
      content: supplier.content,
      currency: supplier.currency,
      subtotal: `£${formatNumberWithCommas(supplier.subTotal)}`,
      supplier_fee: `£${formatNumberWithCommas(supplier.supplierFee)}`,
      total: `£${formatNumberWithCommas(supplier.total)}`,
      phoneNumber: supplier.phoneNumber,
      bankDetails: (
        <div className="flex flex-col gap-y-2">
          <span>{supplier.bankName}</span>
          <span>{supplier.accountName}</span>
          <span>{supplier.accountNo}</span>
        </div>
      ),
      ...(supplier.sortCode && { sortCode: supplier.sortCode }),
    }));

  const paginatedThunkCall = (page) => {
    dispatch(
      getSuppliersThunk({
        status: 'pending',
        page,
      }),
    );
  };

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable
        columns={columns}
        data={new_table_data || []}
        isLoading={loading === LoadingStates.pending}
        pageInfo={suppliers?.pageInfo || {}}
        paginatedThunkCall={paginatedThunkCall}
      />
    </section>
  );
}
