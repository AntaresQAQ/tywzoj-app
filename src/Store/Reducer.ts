import { ReducersMapObject } from "redux";

import { currentUserReducer, envReducer, paginationReducer, versionReducer } from "@/Common/Environment/Reducer";
import { ICurrentUserState, IEnvState, IPaginationState, IVersionState } from "@/Common/Environment/Types";
import { localeReducers } from "@/Common/LocalizedString/Reducer";
import { ILocaleState } from "@/Common/LocalizedString/Types";
import { routerReducer } from "@/Router/Reducer";
import { IRouterState } from "@/Router/Types";

export interface IReducerMap {
  // Global reducers
  env: IEnvState;
  pagination: IPaginationState;
  version: IVersionState;
  currentUser: ICurrentUserState;
  router: IRouterState;
  locale: ILocaleState;
}

export const reducers: ReducersMapObject<IReducerMap> = {
  env: envReducer,
  pagination: paginationReducer,
  version: versionReducer,
  currentUser: currentUserReducer,
  router: routerReducer,
  locale: localeReducers,
} as unknown as ReducersMapObject<IReducerMap>;
