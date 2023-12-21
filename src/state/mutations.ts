import { State } from "./state";
import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { Client } from "@stomp/stompjs";
import { OrderResult } from "../service/response-type";
import { OrderStatus } from "../service/request-body-types";

type WebsocketConfig = {
  serverUrl: string;
  subscribeUrl: string;
};

export type Mutations<S = State> = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state: S, newToken: string | null): void;
  [MutationTypes.INIT_WEB_SOCKET](state: S, config: WebsocketConfig): void;
  [MutationTypes.SET_UNPAID_ORDERS](
    state: S,
    unpaidOrders: OrderResult[]
  ): void;
  [MutationTypes.MARK_ORDER_PAID](state: S, index: number): void;
  [MutationTypes.CANCEL_ORDER](state: S, index: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state, newToken: string | null) {
    state.jwtAuthToken = newToken;
  },
  [MutationTypes.INIT_WEB_SOCKET](state, config: WebsocketConfig): void {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws-endpoint",
      connectHeaders: {
        Authorization: `Bearer ${state.jwtAuthToken}`,
      },
      onConnect: () => {
        client.subscribe("/user/" + "matt" + "/new_order", (message) => {
          console.log("new order!");
          const newOrder: OrderResult = JSON.parse(message.body);
          state.orders.push(newOrder);
        });
      },
      onWebSocketError: (e) => {
        console.error(e);
      },
      onStompError: async (e) => {
        console.log(e);
        alert("Failed to get order status. Please re-login again");
        await client.deactivate();
      },
    });

    window.onbeforeunload = async () => {
      await client.deactivate();
    };

    state.websocket = client;

    state.websocket.activate();
  },
  [MutationTypes.SET_UNPAID_ORDERS](state, unpaidOrders: OrderResult[]): void {
    state.orders.push(...unpaidOrders);
  },
  [MutationTypes.MARK_ORDER_PAID](state, index: number): void {
    state.orders[index].status = OrderStatus.Paid;
    state.orders = state.orders.filter((_, i) => i !== index);
  },
  [MutationTypes.CANCEL_ORDER](state, index: number): void {
    state.orders[index].status = OrderStatus.Cancelled;
    state.orders = state.orders.filter((_, i) => i !== index);
  },
};
