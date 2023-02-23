import { IRootState } from "@/Features/Store";

export const getUserCount = (state: IRootState) => state.userListPage.count;
export const getUserList = (state: IRootState) => state.userListPage.userList;
