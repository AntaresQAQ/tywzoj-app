import { IUserAtomicEntityWithExtra } from "@/Common/ServerType/User";

export interface IGetUserSearchRequestQuery {
    key: string;
    strict?: boolean;
}

export interface IGetUserSearchResponse {
    users: IUserAtomicEntityWithExtra[];
}
