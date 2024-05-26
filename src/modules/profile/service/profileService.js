import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import profileUrls from '@/src/modules/profile/net/profileUrls.js';

const profileServiceClient = newHttpClient(defaultAxiosInstance);

export const getProfile = async (data) => {
  return await profileServiceClient.get(profileUrls.getProfile, data);
};

export const editProfile = async (data) => {
  return await profileServiceClient.patch(profileUrls.editProfile, data);
};

export const getExchangeRates = async () => {
  return await profileServiceClient.get(profileUrls.getExchangeRates);
};
export const getNotifications = async () => {
  return await profileServiceClient.get(profileUrls.getNotifications);
};
