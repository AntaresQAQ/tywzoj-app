import { createReducer } from "@reduxjs/toolkit";

import { setRouter } from "@/Features/Router/Action";
import { IRouterState } from "@/Features/Router/Types";

const routerInitialState: IRouterState = {
  path: "/",
  queries: {},
  hash: null,
};

export const routerReducer = createReducer<IRouterState>(routerInitialState, builder => {
  builder.addCase(setRouter, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
