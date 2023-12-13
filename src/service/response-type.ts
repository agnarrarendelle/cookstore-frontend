export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface UserEntryResult {
  token: string;
}

export interface ProductImageResult {
  uploadUrl: string;
  imageId: string;
}

export interface ProductResult {
  name: string;
  status: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
}
export interface CategoryResult {
  name: string;
  id: number | null;
  products: Array<ProductResult>;
}
