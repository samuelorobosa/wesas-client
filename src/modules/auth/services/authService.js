import {newHttpClient} from "@/src/core/lib/net/httpClient.js";
import {countriesAxiosInstance, defaultAxiosInstance} from "@/src/core/lib/net/axiosInstance.js";
import authUrls from "@/src/modules/auth/net/authUrls.js";

const countriesServiceClient = newHttpClient(countriesAxiosInstance);
const authServiceClient = newHttpClient(defaultAxiosInstance);

export const getCountries = async (data) => {
    return await countriesServiceClient.get(authUrls.getCountries, data);
};

export const registerUser = async (data) => {
    return await authServiceClient.post(authUrls.registerUser, data);
};

export const verifyEmail = async (data) => {
    return await authServiceClient.post(authUrls.verifyEmail, data);
};

export const login = async (data) => {
    return await authServiceClient.post(authUrls.login, data);
};

export const forgotPassword = async (data) => {
    return await authServiceClient.post(authUrls.forgotPassword, data);
};

export const resetPassword = async (data) => {
    return await authServiceClient.post(authUrls.resetPassword, data);
};
