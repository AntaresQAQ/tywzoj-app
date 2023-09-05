import { IUserEntityWithExtra } from "@/Common/ServerType/User";

export interface IUserDetailPageState {
    userDetail: IUserEntityWithExtra;
}

export type IGetUserDetailResponse = IUserEntityWithExtra;
