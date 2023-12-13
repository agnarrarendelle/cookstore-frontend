import axios, { AxiosError, AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { apiUrl } from "../env";
import { useStore } from "../state";
import { MutationTypes } from "../state/mutation-types";
import { ApiResponse, UserEntryResult } from "./response-type";
const store = useStore();

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith("/admin") && !config.url.endsWith("/login")) {
      const token = store.getters.jwtAuthToken;
      console.log("token is " + token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = (failedRequest: AxiosError) =>
  axiosInstance
    .post("/admin/refresh")
    .then(
      (tokenRefreshResponse: AxiosResponse<ApiResponse<UserEntryResult>>) => {
        console.log("get new refresh token!");

        store.commit(
          MutationTypes.SET_JWT_AUTH_TOKEN,
          tokenRefreshResponse.data.data.token
        );
        failedRequest.response!.config.headers["Authorization"] =
          "Bearer " + tokenRefreshResponse.data.data.token;
        return Promise.resolve();
      }
    )
    .catch((e) => {
      console.log("refreshing token failed");
      store.commit(MutationTypes.SET_JWT_AUTH_TOKEN, null);
      return Promise.reject(e);
    });

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  statusCodes: [401, 403],
  pauseInstanceWhileRefreshing: true,
});

axiosInstance.interceptors.response.use(
  null,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.status !== 401 && error.status !== 403) {
        const errorResponseData: ApiResponse<any> = error.response?.data;
        alert(errorResponseData.msg);
      }
    }
    alert(error);
  },
  { synchronous: true }
);

export default axiosInstance;
