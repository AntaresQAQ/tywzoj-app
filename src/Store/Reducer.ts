import { ReducersMapObject } from "redux";

import { currentUserReducer, envReducer, paginationReducer, serverVersionReducer } from "@/Common/Environment/Reducer";
import { ICurrentUserState, IEnvState, IPaginationState, IServerVersionState } from "@/Common/Environment/Types";
import { routerReducer } from "@/Router/Reducer";
import { IRouterState } from "@/Router/Types";

export interface IReducerMap {
  // Global reducers
  env: IEnvState;
  pagination: IPaginationState;
  serverVersion: IServerVersionState;
  currentUser: ICurrentUserState;
  router: IRouterState;
}

export const reducers: ReducersMapObject<IReducerMap> = {
  env: envReducer,
  pagination: paginationReducer,
  serverVersion: serverVersionReducer,
  currentUser: currentUserReducer,
  router: routerReducer,
} as unknown as ReducersMapObject<IReducerMap>;
