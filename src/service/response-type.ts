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
  id: number;
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

export interface OrderItemResult {
  productName: string;
  number: number;
  totalAmount: number;
  actualAmount: number;
  discount: number;
}

export interface OrderResult {
  id: number;
  status: string;
  totalAmount: number;
  actualAmount: number;
  remark: string;
  customerName: string;
  tableNumber: number;
  orderItems: OrderItemResult[];
}
