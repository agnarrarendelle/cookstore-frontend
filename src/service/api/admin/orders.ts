import { ApiResponse, OrderResult } from "../../response-type";
import axios from "../../index";
import { OrderStatus } from "../../request-body-types";

export const getUnpaidOrders = async () => {
  const res = await axios.get<ApiResponse<OrderResult[]>>(
    "/admin/order/unpaid"
  );
  return res.data;
};

const updateOrderStatus = async (id: number, status: OrderStatus) => {
  await axios.put<ApiResponse<void>>(
    `/admin/order/${id}/status?status=${status}`
  );
};

export const setOrderStatusPaid = async(id: number)=>{
    await updateOrderStatus(id, OrderStatus.Paid)
}


export const setOrderStatusCancelled = async(id: number)=>{
    await updateOrderStatus(id, OrderStatus.Cancelled)
}