export interface ProductBody {
  productId?:number
  name: string;
  description: string;
  price: number;
  discount: number;
  categoryId: number;
  isAvailable?:boolean;
  productImageId?: string;
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
