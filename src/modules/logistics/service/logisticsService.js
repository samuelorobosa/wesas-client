import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import logisticsUrls from '@/src/modules/logistics/net/logisticsUrls.js';
import { getFromLocalStorage } from '@/src/core/utils/getFromLocalStorage.js';
import { secretKeys } from '@/src/core/utils/secretKeys.js';

const logisticsServiceClient = newHttpClient(defaultAxiosInstance);

export const createCourierRequest = async (data) => {
  return await logisticsServiceClient.post(
    logisticsUrls.createCourierRequest,
    data,
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const getCouriers = async (data) => {
  return await logisticsServiceClient.get(logisticsUrls.getCouriers, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const approveCourierQuote = async (data) => {
  return await logisticsServiceClient.get(
    `${logisticsUrls.approveCourierRequest}/${data.courierId}`,
    data.queryParams,
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const getShipments = async (data) => {
  return await logisticsServiceClient.get(logisticsUrls.getShipments, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const getShipment = async (data) => {
  return await logisticsServiceClient.get(
    `${logisticsUrls.getShipments}/${data}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const approveShipment = async (id) => {
  return await logisticsServiceClient.get(
    `${logisticsUrls.approveShipment}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};
