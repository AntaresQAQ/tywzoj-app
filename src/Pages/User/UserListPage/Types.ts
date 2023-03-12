import { IUserAtomicEntityWithExtra, IUserEntityWithExtra } from "@/Common/ServerType/User";

export interface IUserListPageState {
  userList: IUserEntityWithExtra[];
  count: number;
  userSearchResults: IUserAtomicEntityWithExtra[];
}

export const enum CE_SortBy {
  Id = "id",
  Rating = "rating",
  AcceptedProblemCount = "acceptedProblemCount",
}

export interface IGetUserListRequestQuery {
  sortBy: CE_SortBy;
  skipCount: number;
  takeCount: number;
}

export interface IGetUserListResponse {
  users: IUserEntityWithExtra[];
  count: number;
}

export interface IGetUserSearchRequestQuery {
  key: string;
  strict?: boolean;
}

export interface IGetUserSearchResponse {
  users: IUserAtomicEntityWithExtra[];
}
