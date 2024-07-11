import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCouriersThunk } from '@/src/modules/logistics/net/logisticsThunks.js';
import DashboardTable from '@/src/core/components/DataTable.jsx';

export default function ShippedCouriers() {
  const {
    get_couriers: { data: couriers },
  } = useSelector((state) => state.logistics);
  const dispatch = useDispatch();
  const columns = [
    {
      accessorKey: 'courier_id',
      header: () => <div className="text-grey-08 font-bold">Courier ID</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('courier_id')}
        </div>
      ),
    },
    {
      accessorKey: 'sender_name',
      header: () => <div className="text-grey-08 font-bold">Sender Name</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('sender_name')}
        </div>
      ),
    },
    {
      accessorKey: 'sender_email',
      header: () => <div className="text-grey-08 font-bold">Sender Email</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('sender_email')}
        </div>
      ),
    },
    {
      accessorKey: 'receiver_name',
      header: () => <div className="text-grey-08 font-bold">Receiver Name</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('receiver_name')}
        </div>
      ),
    },
    {
      accessorKey: 'receiver_email',
      header: () => (
        <div className="text-grey-08 font-bold">Receiver Email</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('receiver_email')}
        </div>
      ),
    },
    {
      accessorKey: 'shipment_content',
      header: () => (
        <div className="text-grey-08 font-bold">Shipment Content</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('shipment_content')}
        </div>
      ),
    },
    {
      accessorKey: 'shipment_value',
      header: () => (
        <div className="text-grey-08 font-bold">Shipment Value</div>
      ),
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('shipment_value')}
        </div>
      ),
    },
    {
      accessorKey: 'courier_fee',
      header: () => <div className="text-grey-08 font-bold">Courier Fee</div>,
      cell: ({ row }) => (
        <div className="font-normal text-grey-08">
          {row.getValue('courier_fee')}
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
    const queryParams = {
      status: 'shipped',
    };
    dispatch(getCouriersThunk(queryParams));
  }, []);

  const new_table_data =
    couriers &&
    couriers.length > 0 &&
    couriers.map((order) => ({
      courier_id: order.id,
      sender_name: order.sender.name,
      sender_email: order.sender.email,
      receiver_name: order.receiver.name,
      receiver_email: order.receiver.email,
      shipment_content: order.shipment.content,
      shipment_value: order.shipment.value,
      courier_fee: order.courierFee,
      action: 'Approve Quote',
    }));

  console.log('couriers', couriers);

  return (
    <section className="mt-4 bg-white p-4 rounded-md">
      <DashboardTable columns={columns} data={new_table_data} />
    </section>
  );
}
