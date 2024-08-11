import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import profileUrls from '@/src/modules/profile/net/profileUrls.js';
import { getFromLocalStorage } from '@/src/core/utils/getFromLocalStorage.js';
import { secretKeys } from '@/src/core/utils/secretKeys.js';

const profileServiceClient = newHttpClient(defaultAxiosInstance);

export const getProfile = async (data) => {
  return await profileServiceClient.get(profileUrls.getProfile, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const editProfile = async (data) => {
  return await profileServiceClient.patch(profileUrls.editProfile, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const getExchangeRates = async () => {
  return await profileServiceClient.get(
    profileUrls.getExchangeRates,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};
export const getNotifications = async () => {
  return await profileServiceClient.get(
    profileUrls.getNotifications,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};
