import { combineReducers, ReducersMapObject } from "redux";

import { IDynamicReducerMap, IReducerMap } from "@/Features/Store/Types";

import { store } from "./index";
import { reducers } from "./Reducer";

let globalReducerMap = reducers;
export function injectDynamicReducer(dynamicReducers: Partial<ReducersMapObject<IDynamicReducerMap>>) {
    globalReducerMap = {
        ...dynamicReducers,
        ...globalReducerMap,
    };
    store.replaceReducer(combineReducers(globalReducerMap));
}

export function injectOverrideReducer(overrideReducers: Partial<ReducersMapObject<IReducerMap>>) {
    globalReducerMap = {
        ...globalReducerMap,
        ...overrideReducers,
    };
    store.replaceReducer(combineReducers(globalReducerMap));
}
