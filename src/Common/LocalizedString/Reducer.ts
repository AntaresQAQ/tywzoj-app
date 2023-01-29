import { createReducer } from "@reduxjs/toolkit";

import { setLocale } from "./Action";
import { ILocaleState } from "./Types";

const localeInitialState: ILocaleState = {} as ILocaleState;

export const localeReducers = createReducer(localeInitialState, builder => {
  builder.addCase(setLocale, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
