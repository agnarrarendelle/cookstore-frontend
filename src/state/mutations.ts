import { State } from "./state";
import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { Client } from "@stomp/stompjs";
import { OrderResult } from "../service/response-type";
export type Mutations<S = State> = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state: S, newToken: string | null): void;
  [MutationTypes.INIT_WEB_SOCKET](state: S, url: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state, newToken: string | null) {
    state.jwtAuthToken = newToken;
  },
  [MutationTypes.INIT_WEB_SOCKET](state, url: string): void {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws-endpoint",
      connectHeaders: {
        Authorization: `Bearer ${state.jwtAuthToken}`,
      },
      onConnect: () => {
        client.subscribe("/user/" + "matt" + "/new_order", (message) => {
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
};
