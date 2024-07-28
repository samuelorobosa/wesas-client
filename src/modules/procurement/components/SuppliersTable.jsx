import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useEffect, useState } from 'react';
import {
  deleteSupplierThunk,
  getSuppliersThunk,
} from '@/src/modules/procurement/net/procurementThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/core/components/ui/alert-dialog.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';

export default function SuppliersTable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteSupplierLoading, setDeleteSupplierLoading] = useState(false);
  const [currentSupplierid, setCurrentSupplierid] = useState(null);
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

  const handleDeleteSupplier = async () => {
    try {
      setDeleteSupplierLoading(true);
      await dispatch(deleteSupplierThunk(currentSupplierid));
      dispatch(getSuppliersThunk());
      toast.success('Supplier has been deleted');
    } catch (error) {
      toast.error(error);
    } finally {
      setDeleteSupplierLoading(false);
      setCurrentSupplierid(null);
    }
  };

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
      action: (
        <Button
          onClick={() => {
            setIsDialogOpen(true);
            setCurrentSupplierid(supplier.id);
          }}
          variant="destructive"
          className="bg-red-500 text-white rounded-md p-2"
        >
          {deleteSupplierLoading ? (
            <ClipLoader
              color="#fff"
              loading={true}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <span>Delete Supplier</span>
          )}
        </Button>
      ),
    }));

  return (
    <>
      <section className="mt-4 bg-white p-4 rounded-md">
        <DashboardTable
          columns={columns}
          data={new_table_data}
          isLoading={loading === LoadingStates.pending}
        />
      </section>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              supplier and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSupplier}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
