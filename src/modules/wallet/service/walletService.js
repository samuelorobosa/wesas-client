import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import walletUrls from '@/src/modules/wallet/net/walletUrls.js';

const walletServiceClient = newHttpClient(defaultAxiosInstance);

export const addFunds = async (data) => {
  return await walletServiceClient.post(walletUrls.addFunds, data);
};

export const addGBPViaCard = async (data) => {
  return await walletServiceClient.post(walletUrls.addGBPViaCard, data);
};

export const getWalletDetails = async () => {
  return await walletServiceClient.get(walletUrls.getWalletDetails);
};

export const getTransactionHistory = async (data) => {
  return await walletServiceClient.get(walletUrls.getTransactionHistory, data);
};

export const getPlans = async () => {
  return await walletServiceClient.get(walletUrls.getPlans);
};

export const subscribeToAPlan = async (id) => {
  return await walletServiceClient.patch(walletUrls.subscribe + `/${id}`);
};

export const getPastSubscriptions = async () => {
  return await walletServiceClient.get(walletUrls.getPastSubscriptions);
};

export const getBanks = async () => {
  return await walletServiceClient.get(walletUrls.getBanks);
};
