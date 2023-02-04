import { IRootState } from "@/Features/Store";

export const getUserDetail = (state: IRootState) => state.userDetailPage.userDetail;
