import { requestAsync } from "@/Common/Request/ApiRequest";

import { IGetUserDetailResponse } from "./Types";

export async function getUserDetailRequestAsync(id: string) {
    return await requestAsync<IGetUserDetailResponse>({
        path: `user/detail/${id}`,
        method: "GET",
    });
}
