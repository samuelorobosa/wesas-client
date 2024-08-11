import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import procurementUrls from '@/src/modules/procurement/net/procurementUrls.js';
import { getFromLocalStorage } from '@/src/core/utils/getFromLocalStorage.js';
import { secretKeys } from '@/src/core/utils/secretKeys.js';

const procurementServiceClient = newHttpClient(defaultAxiosInstance);

export const createOrder = async (data) => {
  return await procurementServiceClient.post(
    procurementUrls.createOrder,
    data,
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const getOrders = async (query) => {
  return await procurementServiceClient.get(procurementUrls.getOrders, query, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const createSupplier = async (data) => {
  return await procurementServiceClient.post(
    procurementUrls.createSupplier,
    data,
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const getSuppliers = async (data) => {
  return await procurementServiceClient.get(
    procurementUrls.getSuppliers,
    data,
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const deleteSupplier = async (id) => {
  return await procurementServiceClient.delete(
    `${procurementUrls.deleteSupplier}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const createShipmentRequest = async (data) => {
  return await procurementServiceClient.post(
    procurementUrls.createShipmentRequest,
    data,
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};
