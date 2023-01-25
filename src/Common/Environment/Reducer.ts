import { createReducer } from "@reduxjs/toolkit";

import { setCurrentUser, setEnv, setPagination, setServerVersion } from "@/Common/Environment/Action";
import { ICurrentUserState, IEnvState, IPaginationState, IServerVersionState } from "@/Common/Environment/Types";
import { getTheme } from "@/Common/Theme";
import { CE_TokenName, getToken } from "@/Common/Utilities/Token";

const envInitialState: IEnvState = {
  apiEndPoint: "http://localhost:9000/",
  apiBearerToken: getToken(CE_TokenName.ApiBearerToken),
  gravatarCdn: "https://cn.gravatar.com/avatar/",
  themeName: getTheme(),
} as unknown as IEnvState;
const serverVersionInitialState: IServerVersionState = null as unknown as IServerVersionState;
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

export const serverVersionReducer = createReducer<IServerVersionState>(serverVersionInitialState, builder => {
  builder.addCase(setServerVersion, (state, action) => action.payload);
});

export const paginationReducer = createReducer<IPaginationState>(paginationInitialState, builder => {
  builder.addCase(setPagination, (state, action) => action.payload);
});

export const currentUserReducer = createReducer<ICurrentUserState>(currentUserInitialState, builder => {
  builder.addCase(setCurrentUser, (state, action) => action.payload);
});
