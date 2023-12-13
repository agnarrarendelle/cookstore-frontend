import axios from "../index";
import { ApiResponse, CategoryResult } from "../response-type";

export const getCategories = async () => {
  const res = await axios.get<ApiResponse<Array<CategoryResult>>>("/category");
  return res.data;
};

export const getCategoryWithProduct = async (id: number) => {
  const res = await axios.get<ApiResponse<CategoryResult>>(
    `/category/${id}/products`
  );
  return res.data;
};
