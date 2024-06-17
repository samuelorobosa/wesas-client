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
