import { IRootState } from "@/Features/Store";

export const getUserCount = (state: IRootState) => state.userListPage.count;
export const getUserList = (state: IRootState) => state.userListPage.userList;
export const getUserSearchResult = (state: IRootState) => state.userListPage.userSearchResults;
