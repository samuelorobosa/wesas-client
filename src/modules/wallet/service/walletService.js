import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import walletUrls from '@/src/modules/wallet/net/walletUrls.js';
import { getFromLocalStorage } from '@/src/core/utils/getFromLocalStorage.js';
import { secretKeys } from '@/src/core/utils/secretKeys.js';

const walletServiceClient = newHttpClient(defaultAxiosInstance);

export const addFunds = async (data) => {
  return await walletServiceClient.post(walletUrls.addFunds, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const addGBPViaCard = async (data) => {
  return await walletServiceClient.post(walletUrls.addGBPViaCard, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const addNGNViaPayStack = async (data) => {
  return await walletServiceClient.post(walletUrls.addNGNViaPayStack, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const getWalletDetails = async () => {
  return await walletServiceClient.get(
    walletUrls.getWalletDetails,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const getTransactionHistory = async (data) => {
  return await walletServiceClient.get(walletUrls.getTransactionHistory, data, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
    },
  });
};

export const getPlans = async () => {
  return await walletServiceClient.get(
    walletUrls.getPlans,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const subscribeToAPlan = async (id) => {
  return await walletServiceClient.patch(
    walletUrls.subscribe + `/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const getPastSubscriptions = async () => {
  return await walletServiceClient.get(
    walletUrls.getPastSubscriptions,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};

export const getBanks = async () => {
  return await walletServiceClient.get(
    walletUrls.getBanks,
    {},
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(secretKeys.USER_TOKEN)}`,
      },
    },
  );
};
