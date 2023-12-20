import { GetterTree } from "vuex";
import { State } from "./state";
import { Client } from "@stomp/stompjs";
import { OrderResult } from "../service/response-type";

export type Getters = {
  jwtAuthToken(state: State): string | null;
  websocket(state: State): Client | null;
  orders(state: State): OrderResult[];
};

export const getters: GetterTree<State, State> & Getters = {
  jwtAuthToken: (state) => state.jwtAuthToken,
  websocket: (state) => state.websocket,
  orders: (state) => state.orders,
};
