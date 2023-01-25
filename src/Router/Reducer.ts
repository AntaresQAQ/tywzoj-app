import { createReducer } from "@reduxjs/toolkit";

import { setRouter } from "@/Router/Action";
import { IRouterState } from "@/Router/Types";

const routerInitialState: IRouterState = {
  path: "/",
  query: {},
  hash: null,
};

export const routerReducer = createReducer<IRouterState>(routerInitialState, builder => {
  builder.addCase(setRouter, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
