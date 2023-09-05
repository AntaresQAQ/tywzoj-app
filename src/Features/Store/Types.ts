import { ICurrentUserState, IEnvState, IPaginationState, IVersionState } from "@/Features/Environment/Types";
import { IErrorState } from "@/Features/Error/Types";
import { ILocaleState } from "@/Features/LocalizedString/Types";
import { IPagesState } from "@/Pages/Types";

export interface IStaticReducerMap {
    // Global reducers
    env: IEnvState;
    pagination: IPaginationState;
    version: IVersionState;
    currentUser: ICurrentUserState;
    locale: ILocaleState;
    error: IErrorState;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDynamicReducerMap extends IPagesState {}

export type IReducerMap = IDynamicReducerMap & IStaticReducerMap;
