import axios from "../../index";
import { ApiResponse, ProductImageResult } from "../../response-type";
import { ProductImageBody } from "../../request-body-types";

export const getProductImageUploadUrl = async (): Promise<
  ApiResponse<ProductImageResult>
> => {
  const res = await axios.get<ApiResponse<ProductImageResult>>(
    "/admin/product-images/upload-url"
  );

  return res.data;
};

export const addProductImageDetail = async (
  body: ProductImageBody
): Promise<ApiResponse<void>> => {
  const res = await axios.post<ApiResponse<void>>(
    "/admin/product-images",
    body
  );
  return res.data;
};
