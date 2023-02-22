import { ReducersMapObject } from "redux";

import { currentUserReducer, envReducer, paginationReducer, versionReducer } from "@/Features/Environment/Reducer";
import { errorReducer } from "@/Features/Error/Reducer";
import { localeReducers } from "@/Features/LocalizedString/Reducer";
import { IReducerMap, IStaticReducerMap } from "@/Features/Store/Types";

export const staticReducers: ReducersMapObject<IStaticReducerMap> = {
  env: envReducer,
  pagination: paginationReducer,
  version: versionReducer,
  currentUser: currentUserReducer,
  locale: localeReducers,
  error: errorReducer,
};

export const reducers: ReducersMapObject<IReducerMap> = staticReducers as unknown as ReducersMapObject<IReducerMap>;
