import axios from "../../index";
import { ApiResponse } from "../../response-type";
import { ProductBody } from "../../request-body-types";

export const addProduct = async (body: ProductBody) => {
  const res = await axios.post<ApiResponse<void>>("/admin/product", body);
  return res.data;
};

export const updateProduct = async (id: number, body: ProductBody) => {
  await axios.put<ApiResponse<void>>(`/admin/product/${id}`, body);
};
