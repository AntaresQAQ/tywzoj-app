import { IRootState } from "@/Features/Store";

export const getErrorCode = (state: IRootState) => state.error.code;
export const getErrorMsg = (state: IRootState) => state.error.msg;
