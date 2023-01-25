import { createAction } from "@reduxjs/toolkit";

import { IRouterState } from "@/Router/Types";

const UPDATE_ROUTER = "Router/Update";

export const setRouter = createAction(UPDATE_ROUTER, (props: Partial<IRouterState>) => ({
  payload: props,
}));
