import { createAction } from "@reduxjs/toolkit";

import { CE_ThemeName } from "@/Common/Theme";
import { CE_TokenName, saveToken } from "@/Common/Utilities/Token";
import { IAppDispatch } from "@/Features/Store";

import { IClientVersionState, ICurrentUserState, IEnvState, IPaginationState, IServerVersionState } from "./Types";

const UPDATE_ENV = "Env/Update";
const UPDATE_SERVER_VERSION = "Version/Server/Update";
const UPDATE_CLIENT_VERSION = "Version/Client/Update";
const UPDATE_PAGINATION = "Pagination/Update";
const UPDATE_CURRENT_USER = "CurrentUser/Update";

export const setEnv = createAction(UPDATE_ENV, (props: Partial<IEnvState>) => ({
    payload: props,
}));

export const setEnvApiBearerToken = (token: string) => (dispatch: IAppDispatch) => {
    dispatch(
        setEnv({
            apiBearerToken: token,
        }),
    );
    saveToken(CE_TokenName.ApiBearerToken, token);
};

export const setTheme = (themeName: CE_ThemeName) => (dispatch: IAppDispatch) => {
    dispatch(setEnv({ themeName }));
};

export const setPageName = (pageName: string) => (dispatch: IAppDispatch) => {
    dispatch(setEnv({ pageName }));
};

export const setServerVersion = createAction(UPDATE_SERVER_VERSION, (props: IServerVersionState) => ({
    payload: props,
}));
export const setClientVersion = createAction(UPDATE_CLIENT_VERSION, (props: IClientVersionState) => ({
    payload: props,
}));

export const setPagination = createAction(UPDATE_PAGINATION, (props: IPaginationState) => ({
    payload: props,
}));

export const setCurrentUser = createAction(UPDATE_CURRENT_USER, (props: ICurrentUserState) => ({
    payload: props,
}));
