import { newHttpClient } from '@/src/core/lib/net/httpClient.js';
import defaultAxiosInstance from '@/src/core/lib/net/axiosInstance.js';
import walletUrls from '@/src/modules/wallet/net/walletUrls.js';

const walletServiceClient = newHttpClient(defaultAxiosInstance);

export const addFunds = async (data) => {
  return await walletServiceClient.post(walletUrls.addFunds, data);
};
