import { AxiosResponse } from "axios";
import axios from "../index"
import { ApiResponse, UserEntryResult } from "../response-type";
export const login = async (
  email: string,
  password: string
): Promise<ApiResponse<UserEntryResult>> => {
  const res = await axios.post<ApiResponse<UserEntryResult>>("/admin/login", {
    email,
    password,
  });
  return res.data;
};

export const refresh = async (): Promise<ApiResponse<UserEntryResult>> => {
  const res = await axios.post<ApiResponse<UserEntryResult>>("/admin/refresh");
  return res.data;
};

export const validate = async ():Promise<AxiosResponse<ApiResponse<UserEntryResult>, any>> => {
  const res = await axios.post<ApiResponse<UserEntryResult>>("/admin/validate");
  return res;
};
