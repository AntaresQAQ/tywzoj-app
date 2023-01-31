import { ReducersMapObject } from "redux";

import { currentUserReducer, envReducer, paginationReducer, versionReducer } from "@/Common/Environment/Reducer";
import { localeReducers } from "@/Common/LocalizedString/Reducer";
import { routerReducer } from "@/Router/Reducer";
import { IReducerMap, IStaticReducerMap } from "@/Store/Types";

export const staticReducers: ReducersMapObject<IStaticReducerMap> = {
  env: envReducer,
  pagination: paginationReducer,
  version: versionReducer,
  currentUser: currentUserReducer,
  router: routerReducer,
  locale: localeReducers,
};

export const reducers: ReducersMapObject<IReducerMap> = staticReducers as unknown as ReducersMapObject<IReducerMap>;
