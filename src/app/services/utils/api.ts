import axios, { AxiosError } from "axios";
import { localStorageKeys } from "../../config/localStorageKeys";
import { APIError } from "../../errors/APIError";

export const api = axios.create({
  // baseURL: 'https://api.painel.gsafra.com', // Prod baseURL
  baseURL: "http://localhost:3003", // Iran baseURL
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);

  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        const error = err.response.data.error as string;

        throw new APIError(error);
      }

      if (err.code === "ERR_NETWORK") {
        throw new APIError("Não foi possível se conectar ao servidor");
      }

      if (err.response?.status === 500) {
        throw new APIError("Problemas no servidor, tente novamente mais tarde");
      }
    }
  },
);
