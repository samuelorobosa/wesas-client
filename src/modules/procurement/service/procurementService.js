import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import procurementUrls from '@/src/modules/procurement/net/procurementUrls.js';

const procurementServiceClient = newHttpClient(defaultAxiosInstance);

export const createOrder = async (data) => {
  return await procurementServiceClient.post(procurementUrls.createOrder, data);
};

export const getOrders = async (query) => {
  return await procurementServiceClient.get(procurementUrls.getOrders, query);
};

export const createSupplier = async (data) => {
  return await procurementServiceClient.post(
    procurementUrls.createSupplier,
    data,
  );
};

export const getSuppliers = async () => {
  return await procurementServiceClient.get(procurementUrls.getSuppliers);
};

export const deleteSupplier = async (id) => {
  return await procurementServiceClient.delete(
    `${procurementUrls.deleteSupplier}/${id}`,
  );
};

export const createShipmentRequest = async (data) => {
  return await procurementServiceClient.post(
    procurementUrls.createShipmentRequest,
    data,
  );
};
