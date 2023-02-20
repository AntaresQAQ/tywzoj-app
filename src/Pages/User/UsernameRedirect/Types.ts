import { IUserAtomicEntity } from "@/Common/ServerType/User";

export interface IGetUserSearchRequestQuery {
  key: string;
  strict?: boolean;
}

export interface IGetUserSearchResponse {
  users: IUserAtomicEntity[];
}
