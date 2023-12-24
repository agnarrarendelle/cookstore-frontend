import axios from "../index";
import { OrderBody } from "../request-body-types";
import { ApiResponse } from "../response-type";

export const addOrder = async (order: OrderBody) => {
  await axios.post<ApiResponse<void>>("/order", order);
};
