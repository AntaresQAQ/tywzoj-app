import { ICurrentUserState, IEnvState, IPaginationState, IVersionState } from "@/Common/Environment/Types";
import { IErrorState } from "@/Common/Error/Types";
import { ILocaleState } from "@/Common/LocalizedString/Types";
import { IPagesState } from "@/Pages/Types";
import { IRouterState } from "@/Router/Types";

export interface IStaticReducerMap {
  // Global reducers
  env: IEnvState;
  pagination: IPaginationState;
  version: IVersionState;
  currentUser: ICurrentUserState;
  router: IRouterState;
  locale: ILocaleState;
  error: IErrorState;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDynamicReducerMap extends IPagesState {}

export type IReducerMap = IDynamicReducerMap & IStaticReducerMap;
