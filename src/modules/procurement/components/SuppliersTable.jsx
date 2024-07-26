import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useEffect } from 'react';
import { getSuppliersThunk } from '@/src/modules/procurement/net/procurementThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';

export default function SuppliersTable() {
  const { data: suppliers, loading } = useSelector(
    (state) => state.procurement.get_suppliers,
  );
  const dispatch = useDispatch();
  const columns = [
    {
      accessorKey: 'supplier_id',
      header: () => <div className="text-grey-08 font-bold">Supplier ID</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('supplier_id')}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: () => <div className="text-grey-08 font-bold">Supplier Name</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">{row.getValue('name')}</div>
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
      accessorKey: 'accountNo',
      header: () => (
        <div className="text-grey-08 font-bold">Account Number</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('accountNo')}
        </div>
      ),
    },
    {
      accessorKey: 'sortCode',
      header: () => <div className="text-grey-08 font-bold">Sort Code</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('sortCode')}
        </div>
      ),
    },
    {
      accessorKey: 'bankName',
      header: () => <div className="text-grey-08 font-bold">Bank Name</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('bankName')}
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
    dispatch(getSuppliersThunk());
  }, []);

  const new_table_data =
    suppliers &&
    suppliers.length > 0 &&
    suppliers.map((supplier) => ({
      supplier_id: supplier.id,
      name: supplier.name,
      phoneNumber: supplier.phoneNumber,
      accountNo: supplier.accountNo,
      sortCode: supplier.sortCode,
      bankName: supplier.bankName,
      action: 'Remove',
    }));

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable
        columns={columns}
        data={new_table_data}
        isLoading={loading === LoadingStates.pending}
      />
    </section>
  );
}
