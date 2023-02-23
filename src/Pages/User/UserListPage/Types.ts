import { IUserEntity } from "@/Common/ServerType/User";

export interface IUserListPageState {
  userList: IUserEntity[];
  count: number;
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
  users: IUserEntity[];
  count: number;
}
