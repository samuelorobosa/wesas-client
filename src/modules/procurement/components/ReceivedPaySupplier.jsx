import DashboardTable from '@/src/core/components/DataTable.jsx';
import { useEffect, useState } from 'react';
import {
  createShipmentRequestThunk,
  getSuppliersThunk,
} from '@/src/modules/procurement/net/procurementThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@/src/core/components/ui/checkbox.jsx';
import { Button } from '@/src/core/components/ui/button.jsx';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import formatNumberWithCommas from '@/src/core/utils/formatNumberWithCommas.js';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';

export default function ReceivedPaySupplier() {
  const [loading, setLoading] = useState(false);
  const {
    get_suppliers: { data: suppliers, loading: getOrdersLoading },
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
                prev.filter((r) => r.id !== row.original.id),
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

  useEffect(() => {
    const queryParams = {
      status: 'received',
    };
    dispatch(getSuppliersThunk(queryParams));
  }, []);

  const filteredSuppliers =
    suppliers &&
    suppliers.data &&
    suppliers.data.length > 0 &&
    suppliers.data.filter((supplier) => supplier.shipmentId == null);

  const new_table_data =
    filteredSuppliers &&
    filteredSuppliers.length > 0 &&
    filteredSuppliers.map((supplier) => {
      return {
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
      };
    });

  const createShipmentRequest = async () => {
    const data = {
      suppliers: selectedRows.map((row) => row.id),
    };
    try {
      setLoading(true);
      await dispatch(createShipmentRequestThunk(data)).unwrap();
      toast.success('Shipment request created successfully');
      const queryParams = {
        status: 'received',
      };
      dispatch(getSuppliersThunk(queryParams));
      setSelectedRows([]);
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };

  const paginatedThunkCall = (page) => {
    dispatch(
      getSuppliersThunk({
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
        pageInfo={suppliers?.pageInfo || {}}
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
