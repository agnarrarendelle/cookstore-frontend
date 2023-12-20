import { Client } from "@stomp/stompjs";
import { OrderResult } from "../service/response-type";
export type State = {
  jwtAuthToken: string | null;
  websocket: Client | null;
  orders: OrderResult[];
};

export const state: State = {
  jwtAuthToken: "",
  websocket: null,
  orders: [],
};
