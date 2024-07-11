import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import logisticsUrls from '@/src/modules/logistics/net/logisticsUrls.js';

const logisticsServiceClient = newHttpClient(defaultAxiosInstance);

export const createCourierRequest = async (data) => {
  return await logisticsServiceClient.post(
    logisticsUrls.createCourierRequest,
    data,
  );
};

export const getCouriers = async (data) => {
  return await logisticsServiceClient.get(logisticsUrls.getCouriers, data);
};

export const approveCourierQuote = async (data) => {
  return await logisticsServiceClient.get(
    `${logisticsUrls.approveCourierRequest}/${data.courierId}`,
    data.queryParams,
  );
};

export const getShipments = async (data) => {
  return await logisticsServiceClient.get(logisticsUrls.getShipments, data);
};

export const getShipment = async (data) => {
  return await logisticsServiceClient.get(
    `${logisticsUrls.getShipments}/${data}`,
  );
};

export const approveShipment = async (id) => {
  return await logisticsServiceClient.get(
    `${logisticsUrls.approveShipment}/${id}`,
  );
};
