export interface ProductBody {
  productId?: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  categoryId: number;
  isAvailable?: boolean;
  productImageId?: string;
}

export interface ProductImageBody {
  id: string;
  name: string;
  productId: number;
}

export interface CategoryBody {
  name: string;
}

export interface OrderItemBody {
  productId: number;
  number: number;
  productName: string;
  price:number
}

export interface OrderBody {
  status?: OrderStatus;
  tableNumber: number;
  remark: string;
  orderItems: OrderItemBody[];
}

export enum OrderStatus {
  Paid = "Paid",
  Unpaid = "Unpaid",
  Cancelled = "Cancelled",
  Finished = "Finished",
}

export enum ProductStatus {
  Available = "Available",
  Unavailable = "Unavailable",
}
