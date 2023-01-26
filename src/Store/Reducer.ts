import { ReducersMapObject } from "redux";

import { currentUserReducer, envReducer, paginationReducer, serverVersionReducer } from "@/Common/Environment/Reducer";
import { ICurrentUserState, IEnvState, IPaginationState, IServerVersionState } from "@/Common/Environment/Types";
import { localeReducers } from "@/Common/LocalizeString/Reducer";
import { ILocaleState } from "@/Common/LocalizeString/Types";
import { routerReducer } from "@/Router/Reducer";
import { IRouterState } from "@/Router/Types";

export interface IReducerMap {
  // Global reducers
  env: IEnvState;
  pagination: IPaginationState;
  serverVersion: IServerVersionState;
  currentUser: ICurrentUserState;
  router: IRouterState;
  locale: ILocaleState;
}

export const reducers: ReducersMapObject<IReducerMap> = {
  env: envReducer,
  pagination: paginationReducer,
  serverVersion: serverVersionReducer,
  currentUser: currentUserReducer,
  router: routerReducer,
  locale: localeReducers,
} as unknown as ReducersMapObject<IReducerMap>;
