export interface ProductBody {
  name: string;
  description: string;
  price: number;
  discount: number;
  categoryId: number;
  productImageId: string;
}

export interface ProductImageBody {
  id: string;
  name: string;
  productId: number;
}

export enum OrderStatus {
  Paid = "Paid",
  Unpaid = "Unpaid",
  Cancelled = "Cancelled",
  Finished = "Finished",
}
