import { IRootState } from "@/Features/Store";

export const getProblemDetail = (state: IRootState) => state.problemDetailPage.problemDetail;
export const getShowTags = (state: IRootState) => state.problemDetailPage.showTags;
