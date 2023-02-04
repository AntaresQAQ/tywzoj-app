import { IUserEntity } from "@/Common/ServerType/User";

export interface IUserDetailPageState {
  userDetail: IUserEntity;
}

export type IGetUserDetailResponse = IUserEntity;
