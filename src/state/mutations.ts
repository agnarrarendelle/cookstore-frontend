import { State } from "./state";
import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";

export type Mutations<S = State> = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state: S, newToken: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state, newToken: string) {
    state.jwtAuthToken = newToken;
  },
};
