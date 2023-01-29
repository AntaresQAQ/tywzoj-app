import { createReducer } from "@reduxjs/toolkit";

import { setClientVersion, setCurrentUser, setEnv, setPagination, setServerVersion } from "@/Common/Environment/Action";
import { ICurrentUserState, IEnvState, IPaginationState, IVersionState } from "@/Common/Environment/Types";
import { CE_ThemeName } from "@/Common/Theme";

const envInitialState: IEnvState = {
  apiEndPoint: "",
  gravatarCdn: "https://cn.gravatar.com/avatar/",
  themeName: CE_ThemeName.Light,
} as unknown as IEnvState;
const versionInitialState: IVersionState = {
  server: {},
  client: {},
} as unknown as IVersionState;
const paginationInitialState: IPaginationState = null as unknown as IPaginationState;
const currentUserInitialState: ICurrentUserState = null as unknown as ICurrentUserState;

export const envReducer = createReducer<IEnvState>(envInitialState, builder => {
  builder.addCase(setEnv, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  });
});

export const versionReducer = createReducer<IVersionState>(versionInitialState, builder => {
  builder
    .addCase(setServerVersion, (state, action) => ({
      ...state,
      server: action.payload,
    }))
    .addCase(setClientVersion, (state, action) => ({
      ...state,
      client: action.payload,
    }));
});

export const paginationReducer = createReducer<IPaginationState>(paginationInitialState, builder => {
  builder.addCase(setPagination, (state, action) => action.payload);
});

export const currentUserReducer = createReducer<ICurrentUserState>(currentUserInitialState, builder => {
  builder.addCase(setCurrentUser, (state, action) => action.payload);
});
